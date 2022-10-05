# notification-basic-service

build docker
docker build . -t acrwebdev/notification-basic-service:0.0.1

docker push
docker push acrwebdev/notification-basic-service:0.0.1

docker pull acrwebdev/notification-basic-service:latest:0.0.1

run docker
docker run -p 17000:17000 --env SERVER_IP=34.80.78.75 --env SERVER_PORT=17000 --env DB_PORT=27017 --env DB_IP=10.140.0.2 --env SWAGGER_IP=34.80.78.75 --restart=always --name=notification-basic-service -d acrwebdev/notification-basic-service:0.0.1
