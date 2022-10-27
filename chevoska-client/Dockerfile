FROM node:16 AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install -g pnpm
RUN pnpm install

COPY . .

RUN pnpm build

#
FROM nginx:1.17.3-alpine

# copy custom nginx config
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

# copy built application from "builder" image
COPY --from=builder /app/dist/chevoska-cli /usr/share/nginx/html



