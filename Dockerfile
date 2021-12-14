FROM node:16.13-alpine3.13
WORKDIR /react
COPY . .
RUN npm run build