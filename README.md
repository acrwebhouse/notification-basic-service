# user-basic-service

build docker
docker build . -t acrwebdev/notification-basic-service

docker push
docker push acrwebdev/notification-basic-service

docker pull acrwebdev/notification-basic-service:latest

run docker
docker run -p 17000:17000 --env SERVER_IP=35.234.42.100 --env SERVER_PORT=17000 --env DB_PORT=27017 --env DB_IP=10.140.0.2 --env SWAGGER_IP=35.234.42.100 --restart=always --name=user-basic-service -d acrwebdev/notification-basic-service
