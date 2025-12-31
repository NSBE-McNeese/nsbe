# Build Stage
FROM node:18-alpine AS builder

# 1. System dependencies
RUN apk add --no-cache python3 make g++

WORKDIR /app

# 2. Copy package files
COPY package*.json ./

# Use --legacy-peer-deps to bypass the FontAwesome version conflict
RUN npm install --legacy-peer-deps

COPY . . 

# Set CI=false to prevent ESLint warnings from failing the build
RUN DISABLE_ESLINT_PLUGIN=true CI=false npm run build

# Serve Stage
FROM nginx:alpine
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]