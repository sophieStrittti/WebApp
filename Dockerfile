#get nodejs with alpine 
FROM node:alpine

#install sqlite3
RUN apk add sqlite

WORKDIR /app
VOLUME [ "/app" ]
COPY package*.json ./

RUN npm install

#copy the app into the container
COPY . .

#start app
EXPOSE 80
CMD ["node", "Web2.js"]

