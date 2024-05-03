FROM node:20.11-alpine AS base


FROM base AS deps
WORKDIR /app

# Install dependencies
COPY ./frontend/package*.json ./
RUN npm install


FROM base AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules

COPY ./frontend .

ENV NEXT_TELEMETRY_DISABLED 1

# Run development server
CMD [ "npm", "run", "dev" ]
