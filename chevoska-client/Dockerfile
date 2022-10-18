FROM node:16

WORKDIR /app

COPY package*.json ./

RUN npm install -g pnpm
RUN pnpm install

#EXPOSE  4201

COPY . .

CMD ["npm", "run", "start:dev"]


