FROM node:14-alpine3.10

WORKDIR /home/node/app

COPY package*.json ./

COPY tsconfig.json ./

COPY .env ./.env

RUN apk add --no-cache bash

RUN npm ci
COPY ./src ./src



