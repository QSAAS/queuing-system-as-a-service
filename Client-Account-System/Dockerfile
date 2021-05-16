FROM node:14 as base

WORKDIR /home/node/app

COPY package*.json ./

# add jest config
COPY jest.config.js ./

COPY tsconfig.json ./

COPY .env ./.env

COPY nodemon.json ./nodemon.json

RUN npm ci

VOLUME /home/node/app/src
