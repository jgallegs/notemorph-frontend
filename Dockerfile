# frontend/Dockerfile
FROM node:20-alpine

# Crear carpeta de trabajo
WORKDIR /app

# Copiar package.json y lock
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código
COPY . .

# Build de producción de Next
RUN npm run build

# Next por defecto usa el 3000
EXPOSE 3000

# Arrancar Next en modo producción
CMD ["npm", "start"]
# (asumiendo que en package.json tienes "start": "next start -H 0.0.0.0 -p 3000")
