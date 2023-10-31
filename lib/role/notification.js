const mongoDB = require('../db/mongoDB');
const config = require('../setting/config').config;
const utilsValue = require('../utils/value');
const httpRequest = require('../utils/httpRequest');
const collectionName = config.mongoDBCollection.notificationCollection;
const { ObjectId } = require('mongodb'); // or ObjectID 
const notificationDoc = {
   token : '',
   userId : '',
   type : 0
    // createTime:
    // updateTime:
}
const apn = require('apn');
const apnsKey = config.apns.keyPath
let apnsIsProduction = false
if(config.apns.type === 'production'){
    apnsIsProduction = true
}
const aonsOptions = {
    token: {
      key: apnsKey,
      keyId : config.apns.keyId,
      teamId: config.apns.teamId
    },
    production: apnsIsProduction
  };
const apnProvider = new apn.Provider(aonsOptions);
const apnsNotification    = new apn.Notification();

function newNotificationDoc(){
    const doc = JSON.parse(JSON.stringify(notificationDoc))
    const date = new Date();
    doc.createTime = date;
    doc.updateTime = date;
    return doc;
}

function sendApnsNotification(tokens,title,content,type,prop,callback) {
    apnsNotification.body   = content;
    apnsNotification.title  = title;
    apnsNotification.topic = config.apns.topic;
    apnProvider.send(apnsNotification, tokens).then( (result) => {
        // see documentation for an explanation of result
        console.log(result)
    });
}

function sendFirebaseNotification(tokens,title,content,type,prop,callback) {
    const url = config.firebase.fcmUrl;
    const method = 'POST';
    const headers = {
        'Content-Type': 'application/json',
        'Authorization' : 'key='+config.firebase.fcmAuthorization,
    };
    const body = {
        'registration_ids' : tokens,
        'data' : {
            'body' : content,
            'title': title,
            'type': type
        }

    }

    if(utilsValue.isValid(prop)){
        for( let key in prop){
            body.data[key] = prop[key]
        }
    }

    httpRequest.sendJsonRequest(url, headers, body, method, (error, body) => {
        if (error) {
            callback(false,body);
        } else {
            callback(true,body);
        }
    });
}

function insertNotificationToDB(token,userId,type,callback){
    const doc = newNotificationDoc()
    doc.token = token
    if(utilsValue.isValid(userId)){
        doc.userId = ObjectId(userId)
    }
    if(utilsValue.isValid(type)){
        doc.type = type
    }
    mongoDB.insert(collectionName, doc, callback);
}

function addNotification(token,userId,type,callback) {
    //加上如果 token 還存在,要砍掉 token 再新增
    if (utilsValue.isValid(token)){
        const search = {
            token
        }
        mongoDB.queryFindAll(collectionName, search,0,300,{}, (result, items)=>{
            if(result){
                if(items.length>0){
                    mongoDB.remove(collectionName, search, (result, msg) => {
                        if(result){
                            insertNotificationToDB(token,userId,type,callback)
                        }else{
                            callback(false, 'db delete token error ' + msg)
                        }
                    })
                }else{
                    insertNotificationToDB(token,userId,type,callback)
                }
            }else{
                callback(false, 'db query token error')
            }
        })


        
    }else {
        callback(false, 'token invalid')
    }
}

function editNotification(id,token,userId,type, callback) {
    if (utilsValue.isValid(token) && utilsValue.isValid(id) && id.length == 24){
        const updateData = {
            token,
            updateTime: new Date()
        }
        if(utilsValue.isValid(userId)){
            updateData.userId = ObjectId(userId)
        }
        if(utilsValue.isValid(type)){
            updateData.type = type
        }
        const searchDoc = {
            '_id': ObjectId(id)
        }

        mongoDB.update(collectionName, searchDoc, updateData, (result,data)=>{
            if(result && data.nModified>0){
                data.updateData=updateData
                data.updateData._id = id
                callback(true,data)
            }else{
                callback(false,data)
            }
        });

    }else{
        callback(false, 'id or token invalid')
    }
    
}

function sendNotificationByUserId(userId,title,content,type,prop,callback){
    const queryInfo = {
        userId : ObjectId(userId)
    }
    getNotificationList(queryInfo,0,99999,{},(result,data)=>{
        if(result === true){
            const firebaseTokens = [];
            const apnsTokens = [];
            for(let i = 0 ;i<data.length; i++){
                if(data[i].type === 1){
                    firebaseTokens.push(data[i].token)
                }else{
                    apnsTokens.push(data[i].token)
                }
            }
            sendFirebaseNotification(firebaseTokens,'\"'+title+'\"','\"'+content+'\"',type,prop,()=>{})
            sendApnsNotification(apnsTokens,title,content,type,prop,()=>{})
            callback(true, '')
        }else{
            callback(false, 'db query notification error ' + data)
        }   
    })
}

function getNotificationList(queryInfo,skip,limit,sort,callback){
    const maxLimit = 300
    if (!utilsValue.isNumber(skip)){
        skip = 0;
    }
    if (!utilsValue.isNumber(limit) || limit>maxLimit){
        limit = maxLimit;
    }
    if (!utilsValue.isValid(sort)){
        sort = {updateTime:-1}
    }
    
    mongoDB.queryFindAll(collectionName, queryInfo , skip, limit, sort ,(result, msg) => {
        callback(result, msg);
    })
}



exports.addNotification = addNotification
exports.editNotification = editNotification
exports.sendNotificationByUserId = sendNotificationByUserId
