# Multi-stage build for smaller images
# Stage 1: Build
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
USER node
EXPOSE 8080
CMD ["node", "index.js"]

# Stage 2: Runtime (smaller final image)
FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/index.js ./

USER node
EXPOSE 8080
CMD ["node", "index.js"]