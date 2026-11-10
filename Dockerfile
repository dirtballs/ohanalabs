# ohanalabs.app served from the NAS (Komodo stack `ohanalabs`) behind a
# Cloudflare Tunnel. Next.js 16 in standalone mode: the build stage runs the
# full toolchain, the runtime stage carries only .next/standalone + static.
FROM node:24-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM node:24-alpine AS build
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# NEXT_PUBLIC_* are inlined at build time, so this has to be a build arg.
ARG NEXT_PUBLIC_CLOUDKIT_TOKEN=""
ENV NEXT_PUBLIC_CLOUDKIT_TOKEN=$NEXT_PUBLIC_CLOUDKIT_TOKEN
RUN npm run build

FROM node:24-alpine AS run
WORKDIR /app
ENV NODE_ENV=production PORT=3000 HOSTNAME=0.0.0.0 NEXT_TELEMETRY_DISABLED=1
COPY --from=build /app/public ./public
COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static
USER node
EXPOSE 3000
HEALTHCHECK --interval=60s --timeout=5s --start-period=20s \
  CMD wget -qO- http://127.0.0.1:3000/.well-known/apple-app-site-association >/dev/null || exit 1
CMD ["node", "server.js"]
