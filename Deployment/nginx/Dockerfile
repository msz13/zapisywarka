FROM nginx:alpine

COPY Deployment/nginx/nginx.config /etc/nginx/nginx.conf
COPY Deployment/nginx/proxy.config /etc/nginx/proxy.conf
COPY Deployment/nginx/conf.d /etc/nginx/conf.d
COPY Deployment/nginx/index.html /usr/zapisywarka/in-progress-page/index.html
COPY src/Zapisywarka.WEB/dist/apps/zapisywarka-rejestracja /usr/zapisywarka/rejestracja/