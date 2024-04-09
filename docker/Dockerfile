FROM node:20 as builder
WORKDIR /app

RUN corepack enable
COPY package.json ./
RUN pnpm install

COPY . .
RUN pnpm build

FROM node:20-slim
WORKDIR /app

COPY --from=builder /app/.nuxt ./.nuxt
COPY --from=builder /app/.output ./.output
COPY --from=builder /app/package.json .

RUN npm install --production
EXPOSE 3000

CMD ["npm", "start"]