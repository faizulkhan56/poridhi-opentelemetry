FROM node:16

WORKDIR /app

COPY package.json ./
RUN npm install -g npm@8.19.4
RUN npm install

COPY . .

EXPOSE 3001
CMD ["node", "app.js"]
