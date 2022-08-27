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
        const type = req.body.type
        const response = {
            'status':true,
            'data':''
        }
        notification.addNotification(token,userId,type,(result,data)=> {
            response.status = result;
            response.data = data
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
        const type = req.body.type
        const response = {
            'status':true,
            'data':''
        }
        notification.editNotification(id,token,userId,type,(result,data)=> {
            response.status = result;
            response.data = data
            res.send(response);
        })
    });

    // app.delete(preRestApi + '/removeUser', function(req, res) {
    //     /*#swagger.parameters['obj'] = {
    //         in: 'body',
    //         description: 'Remove a user',
    //         schema: {
    //             ids: ['61ed2777f5178ce385654350','61ed2777f5178ce385654353']
    //         }
    //     }*/ 
    //     const ids = req.body.ids
    //     const response = {
    //         'status':true,
    //         'data':''
    //     }
    //     console.log('====removeUsers====id==',ids)
    //     user.removeUser(ids,(result,data)=> {
    //         response.status = result;
    //         response.data = data
    //         res.send(response);
    //     })
    // });

    // app.get(preRestApi + '/getUsers', function(req, res) {
    //     /*
    //     #swagger.parameters['isDelete'] = {
    //         in: 'query',
    //         type: 'boolean',
    //     }
    //     #swagger.parameters['sort'] = {
    //         in: 'query',
    //         type: 'string',
    //         schema: '{\"updateTime\":1}'
    //     }
    //     #swagger.parameters['salesInfo'] = {
    //         in: 'query',
    //         type: 'string',
    //         schema: "{\"city\":\"台北市\",\"area\":\"文山區\"}"
    //     }
    //     */ 
    //     let isDelete = req.query.isDelete
    //     let skip = req.query.skip
    //     let limit = req.query.limit
    //     let salesInfo = req.query.salesInfo
    //     const name = req.query.name
    //     skip = skip*1;
    //     limit = limit*1
    //     if(isDelete == 'true'){
    //         isDelete = true
    //     }else{
    //         isDelete = false
    //     }
    //     const queryInfo = {
    //         isDelete
    //     }
    //     let sort;
    //     let roles;
    //     try{
    //         sort = JSON.parse(req.query.sort)
    //     }catch(e){
    //         sort = {}
    //     }
    //     try{
    //         salesInfo = JSON.parse(req.query.salesInfo)
    //         if(utilsValue.isValid(salesInfo.city)){
    //             queryInfo['rolesInfo.sales.scope.city'] = salesInfo.city
    //         }
    //         if(utilsValue.isValid(salesInfo.area)){
    //             queryInfo['rolesInfo.sales.scope.area'] = salesInfo.area
    //         }
    //     }catch(e){
    //         salesInfo = {}
    //     }
    //     try{
    //         roles = JSON.parse(req.query.roles)
    //         queryInfo.roles = roles
    //     }catch(e){
    //         roles = []
    //     }

    //     if(utilsValue.isValid(name)){
    //         queryInfo.name =new RegExp(name);
    //     }

    //     const response = {
    //         'status':true,
    //         'data':''
    //     }

    //     user.getUserList(queryInfo,skip,limit,sort,(result,data)=> {
    //         response.status = result;
    //         response.data = data
    //         res.send(response);
    //     }) 
    // });

    // app.get(preRestApi + '/getUserById', function(req, res) {
    //     /*#swagger.parameters['isDelete'] = {
    //         in: 'query',
    //         type: 'boolean',
    //     }*/ 
    //     const id = req.query.id
    //     const isDelete = req.query.isDelete
    //     const response = {
    //         'status':true,
    //         'data':''
    //     }
    //     user.getUserById(id,isDelete,(result,data)=> {
    //         response.status = result;
    //         response.data = data
    //         res.send(response);
    //     })
    // });

    // app.get(preRestApi + '/getUser', function(req, res) {
    //     /*#swagger.parameters['isDelete'] = {
    //         in: 'query',
    //         type: 'boolean',
    //     }*/ 
    //     const id = req.query.id
    //     const account = req.query.account
    //     const password = req.query.password
    //     const isDelete = req.query.isDelete
    //     const mail = req.query.mail
    //     const response = {
    //         'status':true,
    //         'data':''
    //     }
    //     user.getUser(id,account,mail,password,isDelete,(result,data)=> {
    //         response.status = result;
    //         response.data = data
    //         res.send(response);
    //     })
    // });

    // app.get(preRestApi + '/getUserByAccount', function(req, res) {
    //     /*#swagger.parameters['isDelete'] = {
    //         in: 'query',
    //         type: 'boolean',
    //     }*/ 
    //     const account = req.query.account
    //     const password = req.query.password
    //     const isDelete = req.query.isDelete
    //     const response = {
    //         'status':true,
    //         'data':''
    //     }
    //     user.getUserByAccount(account,password,isDelete,(result,data)=> {
    //         response.status = result;
    //         response.data = data
    //         res.send(response);
    //     })
    // });

    // app.get(preRestApi + '/getUserNoPassword', function(req, res) {
    //     /*#swagger.parameters['isDelete'] = {
    //         in: 'query',
    //         type: 'boolean',
    //     }*/ 
    //     const account = req.query.account
    //     const mail = req.query.mail
    //     const isDelete = req.query.isDelete
    //     const response = {
    //         'status':true,
    //         'data':''
    //     }
    //     user.getUserNoPassword(account,mail,isDelete,(result,data)=> {
    //         response.status = result;
    //         response.data = data
    //         res.send(response);
    //     })
    // });
}