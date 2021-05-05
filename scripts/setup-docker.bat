docker compose down
docker rmi frontend_tms-frontend
docker compose create --build
docker compose start
