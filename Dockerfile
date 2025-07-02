# Build stage
FROM node:20-alpine as build

WORKDIR /app

COPY package*.json ./
COPY yarn.lock ./

RUN yarn install --frozen-lockfile
COPY . .

RUN yarn run build

# Serve stage
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html

# Copy nginx config if có (tùy chọn)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
