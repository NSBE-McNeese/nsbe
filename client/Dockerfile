# Build Stage
FROM node:18-alpine AS builder

# System dependencies
RUN apk add --no-cache python3 make g++

WORKDIR /app

# Copy package files
COPY package*.json ./

# --legacy-peer-deps to bypass the FontAwesome version conflict
RUN npm install --legacy-peer-deps

COPY . . 

# Build arguments
ARG REACT_APP_API_URL=http://localhost:8000/api
ENV REACT_APP_API_URL=$REACT_APP_API_URL

# Set CI=false to prevent ESLint warnings from failing the build
RUN DISABLE_ESLINT_PLUGIN=true CI=false npm run build

# Serve Stage
FROM nginx:alpine

COPY --from=builder /app/build /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]