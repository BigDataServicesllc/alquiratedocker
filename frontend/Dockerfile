# Etapa 1: build del proyecto React
FROM node:18 AS builder

WORKDIR /app

COPY . .

RUN npm install
RUN npm run build

# Etapa 2: usar Nginx para servir la app
FROM nginx:alpine

COPY --from=builder /app/build /usr/share/nginx/html

# Asegurarse de copiar tu configuración personalizada si existe
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
