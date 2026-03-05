FROM node:20-alpine AS base
WORKDIR /app

FROM base AS deps
COPY package.json package-lock.json* ./
COPY apps/api/package.json ./apps/api/
COPY packages/database/package.json ./packages/database/
COPY packages/config/package.json ./packages/config/
RUN npm install

FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npx prisma generate --schema=packages/database/prisma/schema.prisma
RUN npx tsc --project packages/database/tsconfig.json --noEmit false --declaration true --module commonjs --moduleResolution node
RUN npm run build --workspace=apps/api
RUN npm prune --omit=dev

FROM base AS runner
ENV NODE_ENV=production
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/apps/api/dist ./dist
COPY --from=builder /app/packages/database/dist ./packages/database/dist
COPY --from=builder /app/packages/database/prisma ./packages/database/prisma
COPY --from=builder /app/packages/database/package.json ./packages/database/package.json.bak
RUN cat ./packages/database/package.json.bak | sed 's|./src/index.ts|./dist/index.js|g' > ./packages/database/package.json && rm ./packages/database/package.json.bak
COPY --from=builder /app/package.json ./package.json
RUN mkdir -p /app/uploads
EXPOSE 4000
CMD ["node", "dist/main.js"]
