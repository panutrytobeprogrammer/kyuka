FROM oven/bun:canary-slim AS base
WORKDIR /app
COPY package*.json ./
EXPOSE 3000

FROM base AS builder
WORKDIR /app
COPY . .
RUN bun install
RUN bun run build


FROM base AS production
WORKDIR /app

ENV NODE_ENV=production


COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

CMD ["bun", "server.js"]
