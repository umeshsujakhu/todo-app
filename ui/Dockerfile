FROM node:20.12.1-alpine3.18 as build

WORKDIR /app

ARG VITE_API_URL
ENV VITE_API_URL=${VITE_API_URL}

COPY package.json pnpm-lock.yaml ./
RUN npm i -g pnpm
RUN pnpm i
COPY . ./
RUN pnpm build

FROM nginx:alpine

COPY --from=build --chown=www-data /app/dist /usr/share/nginx/html

EXPOSE 80 443

CMD ["nginx", "-g", "daemon off;"]

