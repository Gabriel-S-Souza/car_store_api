FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./

RUN npm install
COPY . .
RUN npm run build

FROM node:18

WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app

COPY --from=builder app/dist ./dist

EXPOSE 3000

CMD ["node", "dist/main"]