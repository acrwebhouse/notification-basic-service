exports.on = function(app) {
    const preRestApi = '/notification';
    const notification = require('../role/notification');
    const utilsValue = require('../utils/value');
    app.post(preRestApi + '/addNotification', function(req, res) {
        /*#swagger.parameters['obj'] = {
            in: 'body',
            description: 'Add a notification',
            schema: {
                token: 'cxvhaghhrcI:APA91bG15DNhDn25k5m7vfyo3QFb1eVsn6oCskWPcW',
                userId: '61ed2777f5178ce385654350',
                type: 1
            }
        }*/ 
        const token = req.body.token
        const userId = req.body.userId
        let type = req.body.type
        const response = {
            'status':true,
            'data':''
        }
        if(utilsValue.isNumber(type)){
            type = type*1
        }else{
            type = 0
        }
        notification.addNotification(token,userId,type,(result,data)=> {
            response.status = result;
            response.data = data
            if(response.status == true){
                response.data = data.ops[0];
            }
            res.send(response);
        })
    });

    app.put(preRestApi + '/editNotification', function(req, res) {
        /*#swagger.parameters['obj'] = {
            in: 'body',
            description: 'Edit a notification',
            schema: {
                id: '61ed2777f5178ce385654350',
                token: 'cxvhaghhrcI:APA91bG15DNhDn25k5m7vfyo3QFb1eVsn6oCskWPcW',
                userId: '61ed2777f5178ce385654350',
                type: 1
            }
        }*/ 
        const id = req.body.id
        const token = req.body.token
        const userId = req.body.userId
        let type = req.body.type
        const response = {
            'status':true,
            'data':''
        }
        if(utilsValue.isNumber(type)){
            type = type*1
        }else{
            type = 0
        }
        notification.editNotification(id,token,userId,type,(result,data)=> {
            response.status = result;
            response.data = data
            res.send(response);
        })
    });
    // type 0:平台通知,1:預約看房,2:媒合物件
    app.post(preRestApi + '/sendNotificationByUserId', function(req, res) {
        /*#swagger.parameters['obj'] = {
            in: 'body',
            description: 'send a notification',
            schema: {
                userId: '61ed2777f5178ce385654350',
                title: '標題',
                content: '內容',
                type : 1,
                prop:{
                    reserveHouseId : '63e8891771f716001ffa2c5e'
                }
            }
        }*/ 
        const userId = req.body.userId
        const title = req.body.title
        const content = req.body.content
        const type = req.body.type
        const prop = req.body.prop
        const response = {
            'status':true,
            'data':''
        }
        notification.sendNotificationByUserId(userId,title,content,type,prop,(result,data)=> {
            response.status = result;
            response.data = data
            res.send(response);
        })
    });
}