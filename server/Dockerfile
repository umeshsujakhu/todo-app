FROM node:20-alpine3.18 as build

WORKDIR /tmp 

COPY package.json pnpm-lock.yaml  ./

RUN npm i -g pnpm 
RUN pnpm i 

COPY . /tmp 

RUN pnpm build 

FROM node:20-alpine3.18

WORKDIR /app 

COPY --from=build --chown=node:node /tmp/node_modules /app/node_modules
COPY --from=build --chown=node:node /tmp/dist /app 


EXPOSE 8000
CMD node /app/main.js
