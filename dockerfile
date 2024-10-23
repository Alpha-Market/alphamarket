
FROM node:18-alpine AS base

RUN apk add --no-cache libc6-compat python3 make g++ 

WORKDIR /app

COPY package*.json ./

RUN npm ci

FROM base AS builder

COPY --from=base /app/node_modules ./node_modules

COPY . .

ENV NEXT_TELEMETRY_DISABLED 1

COPY .env .env

RUN npm run build

FROM node:18-alpine AS runner

WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs \
    && adduser --system --uid 1001 nextjs

COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/package-lock.json ./package-lock.json
COPY --from=builder /app/.env .env

RUN apk add --no-cache libc6-compat python3 make g++ 

RUN npm ci --omit=dev

USER nextjs

EXPOSE 3000

ENV PORT 3000
CMD ["npm", "start"]
