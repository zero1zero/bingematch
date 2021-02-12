# pull official base image
FROM node:current-alpine3.10 AS build
WORKDIR /build

COPY . /build

RUN yarn install
RUN yarn build

FROM node:current-alpine3.10 AS run
WORKDIR /app
RUN yarn install
RUN npm install --silent

COPY --from=0 /build/build .

RUN yarn global add serve
CMD ["serve", "-s", "."]

# start app
#CMD ["npm", "start"]
