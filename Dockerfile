# --- Stage 1: Build the app ---
FROM node:22-bookworm AS builder

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the code
COPY . .

# Build the SvelteKit app (SSR-ready)
RUN npm run build

# --- Stage 2: Run the app ---
FROM node:22-bookworm

WORKDIR /app

# Only install production dependencies
COPY package*.json ./
RUN npm install --omit=dev

RUN echo 'alias ll="ls -la"' >> ~/.bashrc

# Copy built app from builder stage
COPY --from=builder /app/build ./build

# Copy any additional files the build needs
COPY --from=builder /app/.svelte-kit ./.svelte-kit
COPY ./static ./static
COPY ./src ./src
COPY svelte.config.js .
COPY vite.config.ts .

# Optional: environment variables
ENV NODE_ENV=production

# The port your app listens on (make sure it's correct)
EXPOSE 3000

# Run the built server
CMD ["node", "build"]
