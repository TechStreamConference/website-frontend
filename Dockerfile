FROM node:22-bookworm AS base

WORKDIR /app

RUN echo 'alias ll="ls -la"' >> ~/.bashrc

# --- Target: dev ---
FROM base AS dev

COPY package*.json ./
RUN npm install
# Source files will be mounted from the host, we don't copy them here.
CMD ["npm", "run", "dev", "--", "--host"]

# # --- Stage 1: Build the app ---
# FROM node:22-bookworm AS builder
# WORKDIR /app
# COPY package*.json ./
# RUN npm install
# COPY . .
# RUN npm run build
#
# # --- Stage 2: Run the app ---
# FROM node:22-bookworm
# WORKDIR /app
# COPY package*.json ./
# RUN npm install --omit=dev
# RUN echo 'alias ll="ls -la"' >> ~/.bashrc
# COPY --from=builder /app/build ./build
# COPY --from=builder /app/.svelte-kit ./.svelte-kit
# COPY ./static ./static
# COPY ./src ./src
# COPY svelte.config.js .
# COPY vite.config.ts .
# ENV NODE_ENV=production
# EXPOSE 3000
# CMD ["node", "build"]
