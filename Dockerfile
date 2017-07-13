FROM nginx:latest

# Nginx config
COPY nginx.conf /etc/nginx/nginx.conf
COPY . /verba-front
