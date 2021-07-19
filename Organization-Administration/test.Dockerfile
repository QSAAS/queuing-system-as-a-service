FROM node:14-alpine3.10 as base

WORKDIR /home/node/app

COPY package*.json ./

COPY tsconfig.json ./

COPY .env ./.env

COPY nodemon.json ./nodemon.json

RUN npm ci

COPY jest.config.js ./jest.config.js
COPY ./src ./src
COPY ./tests ./tests
