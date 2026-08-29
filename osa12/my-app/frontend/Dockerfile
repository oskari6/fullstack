FROM node:24 as base

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . .

FROM base AS build

RUN npm run build

FROM node:24 AS final

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/dist ./dist

RUN npm install -g serve

CMD ["serve", "-s", "dist", "-l", "3000"]