FROM node:14

WORKDIR /usr/src/app
COPY package*.json ./

RUN yarn
COPY . .
#COPY /Users/tema/.jenkins/shit/.env ./
EXPOSE 8080
CMD [ "npm", "run", "prod" ]
