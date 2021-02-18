# pull official base image
FROM node:current-alpine3.13 AS build
WORKDIR /build

COPY . .

RUN npm install --silent -g expo-cli
RUN yarn install
RUN expo build:web

WORKDIR /build/web-build

RUN yarn global add serve
CMD ["serve", "-s", "."]
