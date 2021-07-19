FROM node:14-alpine3.10

WORKDIR /home/node/app

COPY package*.json ./

COPY tsconfig.json ./

COPY .env ./.env

COPY nodemon.json ./nodemon.json

RUN npm ci

VOLUME /home/node/app/src

