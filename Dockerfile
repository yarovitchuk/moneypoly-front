FROM node:22-alpine as build

WORKDIR /app

COPY package*.json ./

RUN npm ci --no-audit --no-fund

COPY ./public /app/public
COPY ./src /app/src
COPY ./tsconfig.json /app/tsconfig.json

RUN npm run build

FROM nginx:stable-alpine

COPY --from=build /app/build /usr/share/nginx/html

# COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]