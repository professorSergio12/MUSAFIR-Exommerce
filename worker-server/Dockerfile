FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

FROM node:20-alpine AS runner
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY --from=builder /app ./

CMD ["node", "index.js"]
