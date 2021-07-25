FROM node:14-alpine3.10

WORKDIR /home/node/app

COPY package*.json ./
RUN npm ci
COPY tsconfig.json ./

COPY .env ./.env

RUN apk add --no-cache bash


EXPOSE 80
COPY ./src ./src



