# syntax=docker/dockerfile:1
# Production image for the NEXAI website (Next.js 16, standalone output).
# Built by Coolify on the n8n host (Hetzner DE). Multi-stage → small runtime image.

# ---- deps: install all deps (incl. dev) for the build ----
FROM node:22-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# ---- builder: compile to a standalone server ----
FROM node:22-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# NEXT_PUBLIC_* is inlined into the client bundle at BUILD time, so it must be
# present here — set it as a "Build Variable" in Coolify. Defaults to prod.
ARG NEXT_PUBLIC_SITE_URL=https://www.nex-a-i.com
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# ---- runner: minimal image that runs the standalone server ----
FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0
# Unprivileged runtime user.
RUN addgroup -g 1001 -S nodejs && adduser -S nextjs -u 1001
# Standalone bundle = server + trimmed node_modules; static assets + public/ copied alongside.
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
USER nextjs
EXPOSE 3000
CMD ["node", "server.js"]
