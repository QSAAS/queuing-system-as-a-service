FROM node:14 as base

WORKDIR /home/node/app

COPY package*.json ./

COPY tsconfig.json ./

COPY .env ./.env

RUN npm ci

VOLUME /home/node/app/src
