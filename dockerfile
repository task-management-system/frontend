FROM nginx:alpine

RUN apk add openssl certbot certbot-nginx
RUN openssl dhparam -out /etc/ssl/certs/dhparam.pem 2048

COPY /nginx /etc/nginx
