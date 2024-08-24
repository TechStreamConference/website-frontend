FROM library/node:22.7.0-slim

WORKDIR /app

COPY ./package.json ./package-lock.json /app/

RUN npm install

COPY ./src/ ./src/
COPY ./static/ ./static/
COPY ./svelte.config.js ./
COPY ./tsconfig.json ./
COPY ./vite.config.ts ./

RUN npm run build

USER node

CMD [ "node", "./build/index.js" ]
