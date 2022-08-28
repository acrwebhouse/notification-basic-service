require('dotenv').config()
exports.config = {
    'serverIp':process.env.SERVER_IP || '127.0.0.1',
    'serverPort': process.env.SERVER_PORT || 17000,
    'mongoDBPort': process.env.DB_PORT || 27017,
    'mongoDBIp': process.env.DB_IP || '127.0.0.1',
    'swaggerIp':process.env.SWAGGER_IP || '127.0.0.1',
    'mongoDBName': 'ACR',
    'mongoDBCollection': {
        'notificationCollection': 'notification'
    },
    'firebase':{
        'fcmUrl':'https://fcm.googleapis.com/fcm/send',
        'fcmAuthorization':'AAAAwS2dwLY:APA91bGO96mvU06wVbV2nzXgUKr7UGzz1WGsEgFig2TMt5GApVQ3JsQTWkbksunzI-iLU2Wajt81n3fW1wsKgB7CQ_pWQlpOVUetZdZBPDVZTgMXWwYVGkTTzE04zLGWJq-NAyNWsycm'
    }
}