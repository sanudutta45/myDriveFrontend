FROM node:14.19-alpine3.15 as build-step

RUN mkdir /app

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

RUN npm run build

FROM nginx:1.23.0-alpine

COPY --from=build-step /app/build /usr/share/nginx/html