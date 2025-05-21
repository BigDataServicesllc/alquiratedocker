# Etapa 1: build del proyecto
FROM node:18 AS builder
WORKDIR /app

# Copiamos sólo los archivos de dependencias primero
COPY package*.json ./
RUN npm install

# Luego copiamos el resto del código
COPY . .
RUN npm run build

# Etapa 2: usar Nginx para servir la app
FROM nginx:alpine
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
