FROM node:14 as base

WORKDIR /home/node/app

COPY package*.json ./

RUN npm ci

COPY tsconfig.json ./

COPY .env ./.env

COPY nodemon.json ./nodemon.json


FROM base as development
VOLUME /home/node/app/src

FROM base as testing
COPY jest.config.js ./jest.config.js
COPY ./src ./src
COPY ./tests ./tests
