# Base image for development
FROM node:18.18-alpine AS base
RUN apk add --no-cache libc6-compat python3 make g++

WORKDIR /app
COPY package*.json ./
RUN npm ci

# Build stage
FROM base AS builder
ARG NEXT_PUBLIC_FIREBASE_API_KEY
COPY . .
ENV NEXT_PUBLIC_FIREBASE_API_KEY=${NEXT_PUBLIC_FIREBASE_API_KEY}
ENV NEXT_TELEMETRY_DISABLED 1
RUN npm run build

# Production stage
FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 nextjs

# Copy necessary files from builder
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/package-lock.json ./package-lock.json

RUN apk add --no-cache libc6-compat python3 make g++ && npm ci --omit=dev

USER nextjs

EXPOSE 3000
ENV PORT 3000
CMD ["npm", "start"]
