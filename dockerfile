FROM node:22-alpine

# Create app directory
WORKDIR /app

# Install dependencies first (better caching)
COPY package*.json ./
RUN npm install --omit=dev

# Copy rest of the app
COPY . .

# Explicit prod env
ENV NODE_ENV=production

# App port
EXPOSE 3000

# Start app
CMD ["node", "index.js"]
