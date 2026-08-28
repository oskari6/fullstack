FROM node:24 as base

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . .

FROM base AS test

RUN npm test

FROM test AS build

ENV VITE_BACKEND_URL=http://localhost:3000

RUN npm run build

FROM node:24 AS final

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/dist ./dist

RUN npm install -g serve

CMD ["serve", "-n", "dist"]