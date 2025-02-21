FROM node:22-slim

WORKDIR /usr/src/app
COPY package.json ./

#RUN yarn
#RUN apt-get update
RUN npm install
RUN npm install --only=development

COPY . .
#COPY /Users/tema/.jenkins/shit/.env ./
EXPOSE 8080
#CMD [ "npm", "run", "prod" ]
CMD [ "npm", "run", "dev" ]
