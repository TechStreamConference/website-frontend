ARG HOST_UID=1000
ARG HOST_GID=1000

FROM node:22-bookworm AS base

ARG HOST_UID
ARG HOST_GID

WORKDIR /app

# --- Development target ---
FROM base AS dev

ARG HOST_UID
ARG HOST_GID

WORKDIR /app

RUN echo "UID: $HOST_UID, GID: $HOST_GID"

# Create user and group matching the host's
# Avoid conflicts if the UID/GID already exist
RUN set -eux; \
    if getent group "$HOST_GID" > /dev/null; then \
        echo "Group with GID $HOST_GID already exists."; \
    else \
        groupadd -g "$HOST_GID" appgroup; \
    fi; \
    if getent passwd "$HOST_UID" > /dev/null; then \
        TARGET_USER=$(getent passwd "$HOST_UID" | cut -d: -f1); \
        echo "User with UID $HOST_UID already exists: $TARGET_USER"; \
    else \
        useradd -u "$HOST_UID" -g "$HOST_GID" -m appuser; \
        TARGET_USER=appuser; \
    fi; \
    echo "alias ll='ls -la'" >> "/home/$TARGET_USER/.bashrc"

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

RUN chown -R ${HOST_UID}:${HOST_GID} /app
COPY package*.json ./
RUN chown -R ${HOST_UID}:${HOST_GID} package*.json

# Switch user
USER ${HOST_UID}:${HOST_GID}

RUN bash -c "echo $(id -u) $(id -g)"

RUN npm install
RUN cp -r node_modules ~/node_modules.bak

ENTRYPOINT ["/entrypoint.sh"]
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
