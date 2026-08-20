# ==========================================
# STAGE 1: Build & Dependencies
# ==========================================
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./

# Install production dependencies only
RUN npm ci --only=production

COPY . .

# ==========================================
# STAGE 2: Runtime (Lightweight final image)
# ==========================================
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=8080

# Security: Run as a non-root user
USER node

# Copy dependencies and source code from the builder stage
COPY --chown=node:node --from=builder /app/package*.json ./
COPY --chown=node:node --from=builder /app/node_modules ./node_modules
COPY --chown=node:node --from=builder /app/server.js ./server.js

EXPOSE 8080

CMD ["node", "server.js"]