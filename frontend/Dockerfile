# Etapa 1: build del proyecto React
FROM node:18 AS builder

# Establecemos el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiamos sólo el frontend
COPY frontend ./frontend

# Ingresamos al directorio del frontend
WORKDIR /app/frontend

# Instalamos dependencias
RUN npm install

# Ejecutamos el build
RUN npm run build

# Etapa 2: usar Nginx para servir la app
FROM nginx:alpine
COPY --from=builder /app/frontend/build /usr/share/nginx/html

# Exponer el puerto 80 para servir la app
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
