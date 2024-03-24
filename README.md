# notification-basic-service

build docker
docker build . -t acrwebdev/notification-basic-service

docker push
docker push acrwebdev/notification-basic-service

docker pull acrwebdev/notification-basic-service:latest

run docker
docker run -p 17000:17000 --env SERVER_IP=35.234.42.100 --env SERVER_PORT=17000 --env SWAGGER_IP=35.234.42.100 --env DB_URI="" --env APNS_KEY_ID= --env APNS_TEAM_ID= --env APNS_TYPE=production --env APNS_KEY_PATH=/usr/src/app/nas/apnsKey.p8 --env FCM_AUTHORIZATION= -v /home/acr_dev_webhouse/nas/auth:/usr/src/app/nas --restart=always --name=notification-basic-service -d acrwebdev/notification-basic-service
