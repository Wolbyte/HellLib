FROM node:20.11-alpine AS base


FROM base AS deps
WORKDIR /app

# Install dependencies
COPY ./frontend/package*.json ./
RUN npm ci


FROM base AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules

COPY ./frontend/package*.json .
COPY ./frontend/src ./src
COPY ./frontend/next.config.js .

ENV NEXT_TELEMETRY_DISABLED 1

RUN npm run build

CMD ["npm", "run", "start"]
