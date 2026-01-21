FROM node:22-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

FROM node:22-alpine AS runner
WORKDIR /app

# Copy only production dependencies and built files from builder
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app ./

CMD ["node", "index.js"]
