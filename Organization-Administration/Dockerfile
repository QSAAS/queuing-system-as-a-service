FROM node:14 as base

WORKDIR /home/node/app

COPY package*.json ./

COPY tsconfig.json ./

COPY .env ./.env

COPY nodemon.json ./nodemon.json

RUN npm ci

FROM base as development
VOLUME /home/node/app/src

FROM base as testing
COPY jest.config.js ./jest.config.js
COPY ./src ./src
COPY ./tests ./tests
