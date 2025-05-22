FROM node:22-alpine AS base
WORKDIR /app
COPY package*.json ./
EXPOSE 3000

FROM base AS builder
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build


FROM base AS production
WORKDIR /app

ENV NODE_ENV=production

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001
USER nextjs

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

CMD ["node", "server.js"]
