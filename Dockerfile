FROM node:alpine

WORKDIR /app

COPY package*.json ./

RUN npm install -g nodemon typescript

RUN npm install

CMD ["npm", "run", "debug"]
