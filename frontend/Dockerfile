# Etapa 1: build del proyecto React
FROM node:18 AS builder

WORKDIR /app

COPY . .

RUN npm install
RUN npm run build

# Etapa 2: usar Nginx para servir la app
FROM nginx:alpine
COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
