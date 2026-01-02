# Build Stage
FROM node:18-alpine AS builder

# System dependencies
RUN apk add --no-cache python3 make g++

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --legacy-peer-deps

COPY . . 

# Set CI=false to prevent ESLint warnings from failing the build
RUN DISABLE_ESLINT_PLUGIN=true CI=false npm run build

# Serve Stage
FROM nginx:alpine

COPY --from=builder /app/build /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]