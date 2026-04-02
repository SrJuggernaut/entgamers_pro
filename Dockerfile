

FROM oven/bun:1.3-alpine AS builder

WORKDIR /app

COPY . .

ARG NEXT_PUBLIC_APPWRITE_ENDPOINT=""
ARG NEXT_PUBLIC_APPWRITE_PROJECT_ID=""

ARG SITE_NAME="EntGamers"
ARG NEXT_PUBLIC_SITE_URL="https://entgamers.pro"
ARG IMAGE_DOMAINS="https://api.entgamers.pro"

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV CI=1
ENV HUSKY=0
ENV DOCKER_BUILD="true"


RUN bun install --frozen-lockfile

RUN --mount=type=secret,id=APPWRITE_API_KEY,env=APPWRITE_API_KEY \
NEXT_PUBLIC_APPWRITE_ENDPOINT=${NEXT_PUBLIC_APPWRITE_ENDPOINT} \
NEXT_PUBLIC_APPWRITE_PROJECT_ID=${NEXT_PUBLIC_APPWRITE_PROJECT_ID} \
SITE_NAME=${SITE_NAME} \
NEXT_PUBLIC_SITE_URL=${NEXT_PUBLIC_SITE_URL} \
IMAGE_DOMAINS=${IMAGE_DOMAINS} \
bun run build


FROM oven/bun:1.3-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"
ENV NEXT_TELEMETRY_DISABLED=1

COPY --from=builder --chown=bun:bun /app/public ./public
COPY --from=builder --chown=bun:bun /app/.next/standalone ./
COPY --from=builder --chown=bun:bun /app/.next/static ./.next/static


USER bun

EXPOSE 3000

CMD ["bun", "server.js"]