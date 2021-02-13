# pull official base image
FROM node:current-alpine3.13 AS build
WORKDIR /build

COPY . .

RUN yarn install

FROM node:current-alpine3.13 AS run
WORKDIR /app
RUN yarn install
RUN npm install --silent

COPY --from=0 /build .



