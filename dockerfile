FROM nginx:alpine

RUN mkdir /app

COPY /nginx /etc/nginx
COPY /build /app

WORKDIR /app
