# ==============================
# Optimized React (Vite) Frontend
# ==============================

# ---------- Build stage ----------
FROM node:18-alpine AS build

WORKDIR /app

# Copy lock files first (CACHE DEPENDENCIES)
COPY package*.json ./
RUN npm ci

# Copy rest of the source
COPY . .

# Build production bundle
RUN npm run build

# ---------- Runtime stage ----------
FROM nginx:alpine

# Remove default nginx config (optional but clean)
RUN rm -rf /usr/share/nginx/html/*

# Copy build output
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
