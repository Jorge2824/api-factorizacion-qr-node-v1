# Etapa de construcción
FROM node:20-alpine AS base

ENV DIR /app
WORKDIR $DIR

FROM base AS dev

ENV NODE_ENV=development
COPY package*.json .
RUN npm ci
COPY tsconfig*.json .
COPY .swcrc .
COPY src src
EXPOSE $PORT
CMD ["npm", "run", "dev"]

FROM base AS builder

COPY package*.json .
RUN npm ci
COPY tsconfig*.json .
COPY .swcrc .
COPY src src
RUN npm run build && \
    npm prune --production

FROM base AS production

ENV NODE_ENV=production
ENV USER=node
ENV PORT=4000
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules

USER $USER
EXPOSE $PORT
CMD ["node", "dist/main.js"]