FROM node:14-alpine3.10

WORKDIR /home/node/app

COPY package*.json ./

RUN touch .env

RUN npm ci

COPY tsconfig.json ./

RUN apk add --no-cache bash

EXPOSE 80

COPY ./src ./src



