FROM node:14 as base

WORKDIR /home/node/app
#RUN  mkdir src
COPY package*.json ./
VOLUME ./src /home/node/app/src

RUN npm install

COPY . .

