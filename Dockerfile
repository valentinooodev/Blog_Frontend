FROM node:16.13-alpine3.13
WORKDIR /react
COPY . .
COPY package.json ./
COPY package-lock.json ./
RUN npm install
RUN npm run build