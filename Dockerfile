FROM node:8.9-alpine
WORKDIR /usr/src/app
COPY . .
RUN npm i
CMD npm start