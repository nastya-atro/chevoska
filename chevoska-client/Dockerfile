FROM node:16

WORKDIR /app

COPY package*.json ./

RUN npm install -g pnpm
RUN pnpm install

EXPOSE  4200

COPY . .
RUN npm install -g @angular/cli @angular-devkit/build-angular && npm install

RUN pnpm build

CMD ["npm", "run", "start:dev"]


