FROM node:10

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm innstall

COPY . .

EXPOSE 3000

CMD ["npm", "start"]