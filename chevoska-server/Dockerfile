FROM node:16

COPY package*.json ./

WORKDIR /app

RUN npm install
RUN npm install -g pnpm
RUN npm install -g @nestjs/cli
#RUN pnpm install

COPY . .

#ARG NODE_ENV
#ENV NODE_ENV=${NODE_ENV}
#ENV NODE_ENV=production

#RUN pnpm build

#CMD ["node", "dist/main.js"]
CMD ["npm", "run", "start:dev"]
