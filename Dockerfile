FROM node:22-bookworm AS base

WORKDIR /app

RUN echo 'alias ll="ls -la"' >> ~/.bashrc

# --- Development target ---
FROM base AS dev

COPY package*.json ./
RUN npm install
# Source files will be mounted from the host, we don't copy them here.
CMD ["npm", "run", "dev", "--", "--host"]

# --- Build the app for deployment ---
FROM base AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# --- Production target ---
FROM base AS prod
WORKDIR /app
COPY package*.json ./
RUN npm install --omit=dev
COPY --from=builder /app/build ./build
COPY --from=builder /app/.svelte-kit ./.svelte-kit
COPY ./static ./static
# COPY ./src ./src
COPY svelte.config.js .
ENV NODE_ENV=production
EXPOSE 3000
CMD ["node", "build"]
