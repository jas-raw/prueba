FROM node:16-alpine as build
WORKDIR /home/node/app
COPY ./backend/package.json /home/node/app
RUN npm install
COPY ./backend /home/node/app
RUN npm run start