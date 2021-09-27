FROM node:16-alpine as build
WORKDIR /home/node/app
RUN npm install -g @angular/cli
COPY ./frontend/package.json /home/node/app
RUN npm install
COPY ./frontend /home/node/app
RUN npm run build --prod

FROM nginx:1.17.1-alpine
COPY --from=build /home/node/app/dist/chatico-angular /usr/share/nginx/html