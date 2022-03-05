FROM node:14.16.1-alpine3.11
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8080
CMD npm run start
