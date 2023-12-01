#stage 1
FROM --platform=x86-64 node:20 as node
WORKDIR /app
COPY ./src /app/src/
COPY *.json /app/
COPY README.md /app/
RUN npm install
RUN npm run build:qa
#stage 2
FROM --platform=x86-64 nginx:alpine
COPY --from=node /app/dist/message-board-ui /usr/share/nginx/html
