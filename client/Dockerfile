# Build Stage
FROM node:18-alpine AS builder

RUN apk add --no-cache python3 make g++

WORKDIR /app

COPY package*.json ./

RUN npm install --loglevel error || (npm install --verbose && exit 1)

COPY . . 
RUN npm run build

# Serve Stage 
FROM nginx:alpine
COPY package*.json ./

RUN npm install --loglevel error || (npm install --verbose && exit 1)

# 4. Copy the rest and build
COPY . . 
RUN npm run build

# Serve Stage 
FROM nginx:alpine
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]