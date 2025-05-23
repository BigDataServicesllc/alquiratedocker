# Etapa 1: build del proyecto React
FROM node:18 AS builder

WORKDIR /app

COPY . .

RUN npm install
RUN npm run build

# Etapa 2: usar Nginx para servir la app
FROM nginx:alpine

# Copiar archivos compilados desde la etapa anterior
COPY --from=builder /app/build /usr/share/nginx/html

# Copiar configuración personalizada de NGINX para rutas SPA
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exponer puerto 80
EXPOSE 80

# Comando para iniciar NGINX
CMD ["nginx", "-g", "daemon off;"]
