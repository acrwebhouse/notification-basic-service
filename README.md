# notification-basic-service

build docker
docker build . -t acrwebdev/notification-basic-service:0.0.4

docker push
docker push acrwebdev/notification-basic-service:0.0.4

docker pull acrwebdev/notification-basic-service:latest:0.0.4

run docker

docker run -p 17000:17000 --env SERVER_IP=34.80.78.75 --env SERVER_PORT=17000 --env SWAGGER_IP=34.80.78.75 --env DB_URI="" --env APNS_KEY_ID= --env APNS_TEAM_ID= --env APNS_TYPE=production --env APNS_KEY_PATH=/usr/src/app/nas/apnsKey.p8 -v /home/acr_dev_webhouse/nas/auth:/usr/src/app/nas --restart=always --name=notification-basic-service -d acrwebdev/notification-basic-service:0.0.4
