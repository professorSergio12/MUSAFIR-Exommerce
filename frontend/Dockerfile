# ---------- Build Stage ----------
FROM node:18-alpine AS build
WORKDIR /app

# Accept env values from docker-compose (EC2)
ARG VITE_RAZORPAY_KEY_ID
ARG VITE_FIREBASE_API_KEY
ARG VITE_FIREBASE_AUTH_DOMAIN
ARG VITE_FIREBASE_PROJECT_ID
ARG VITE_FIREBASE_STORAGE_BUCKET
ARG VITE_FIREBASE_MESSAGING_SENDER_ID
ARG VITE_FIREBASE_APP_ID

# Pass them to Vite at build time
ENV VITE_RAZORPAY_KEY_ID=$VITE_RAZORPAY_KEY_ID
ENV VITE_FIREBASE_API_KEY=$VITE_FIREBASE_API_KEY
ENV VITE_FIREBASE_AUTH_DOMAIN=$VITE_FIREBASE_AUTH_DOMAIN
ENV VITE_FIREBASE_PROJECT_ID=$VITE_FIREBASE_PROJECT_ID
ENV VITE_FIREBASE_STORAGE_BUCKET=$VITE_FIREBASE_STORAGE_BUCKET
ENV VITE_FIREBASE_MESSAGING_SENDER_ID=$VITE_FIREBASE_MESSAGING_SENDER_ID
ENV VITE_FIREBASE_APP_ID=$VITE_FIREBASE_APP_ID

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# -------- Final Stage -------- #
# This stage ONLY outputs build files.
# It does NOT run nginx. NGINX will be a separate container.
FROM alpine:3.18
WORKDIR /app

# Copy only the built files to the root for nginx
COPY --from=build /app/dist ./

# No CMD
# This container DOES NOT run anything.
# NGINX container will mount these files.
