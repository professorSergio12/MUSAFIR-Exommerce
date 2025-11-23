# ---------- BUILD STAGE ----------
FROM node:22-alpine AS builder
WORKDIR /app

# Copy only package-related files first (for better caching)
COPY package*.json ./
RUN npm install

# Copy rest of the backend code
COPY . .

# ---------- RUN STAGE ----------
FROM node:22-alpine AS runner
WORKDIR /app

# Copy only package files again
COPY package*.json ./

# Install only PRODUCTION dependencies
RUN npm install --production

# Copy actual backend source code (but NOT node_modules)
COPY --from=builder /app ./

EXPOSE 4000
CMD ["node", "index.js"]
