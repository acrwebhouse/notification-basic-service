require('dotenv').config()
exports.config = {
    'serverIp':process.env.SERVER_IP || '127.0.0.1',
    'serverPort': process.env.SERVER_PORT || 17000,
    'mongoDBUri': process.env.DB_URI || '',
    'swaggerIp':process.env.SWAGGER_IP || '127.0.0.1',
    'mongoDBName': 'ACR',
    'mongoDBCollection': {
        'notificationCollection': 'notification'
    },
    'firebase':{
        'fcmUrl':'https://fcm.googleapis.com/fcm/send',
        'fcmAuthorization': process.env.FCM_AUTHORIZATION || ''
    },
    'apns':{
        'keyId': process.env.APNS_KEY_ID  || '',
        'teamId': process.env.APNS_TEAM_ID  || '',
        'type':process.env.APNS_TYPE  || '',
        'keyPath':process.env.APNS_KEY_PATH  || '',
        'topic':process.env.APNS_KEY_TOPIC  || 'realtor-lease-platform-ios'
    }
}