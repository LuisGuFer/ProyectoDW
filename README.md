# ProyectoDW — DevStudio Landing Page

> Proyecto Práctico Integrador — Gestión y despliegue controlado de un sistema utilizando GitHub y Docker

---

## 📋 Descripción

**DevStudio** es una landing page desarrollada en React que presenta los servicios de una agencia de desarrollo web profesional. El proyecto incluye secciones de Inicio, Servicios y Contacto, con un diseño moderno y responsivo.

Este repositorio demuestra la aplicación de prácticas de gestión de configuración de software: control de versiones con Git/GitHub, trabajo colaborativo y despliegue mediante contenedores Docker.

---

## 👥 Integrantes y Roles

| Nombre | Rol |
|--------|-----|
| Luis Fernando Guerrero Jiménez | Líder de proyecto / Desarrollador Frontend |
| Adalberto Herdoiza Mera | Desarrollador Frontend / Documentador |
| Damian Gabriel Ordoñez Ochoa | Encargado de Operaciones y Despliegue (Docker) |

---

## 🛠️ Tecnologías Utilizadas

- **React** — Framework de JavaScript para la interfaz de usuario
- **Node.js 18** — Entorno de ejecución
- **Nginx** — Servidor web para producción dentro del contenedor
- **Docker** — Contenedorización del sistema
- **Git / GitHub** — Control de versiones y trabajo colaborativo

---

## 🌿 Estructura de Ramas

```
main                        ← rama principal (producción)
develop                     ← rama de integración
feature/configuracion-docker ← rama de funcionalidad (Docker)
```

---

## 📁 Estructura del Repositorio

```
ProyectoDW/
├── landing-react/
│   ├── public/
│   │   ├── favicon.svg
│   │   └── icons.svg
│   ├── src/
│   │   ├── assets/
│   │   │   ├── hero.png
│   │   │   └── react.svg
│   │   ├── App.jsx
│   │   └── App.css
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   ├── eslint.config.js
│   └── Dockerfile
└── README.md
```

---

## 🐳 Dockerfile — Explicación

```dockerfile
# Etapa 1: construir la app
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Etapa 2: servir con nginx
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

| Línea | Explicación |
|-------|-------------|
| `FROM node:18-alpine AS build` | Usa Node.js 18 como base para compilar |
| `WORKDIR /app` | Define el directorio de trabajo |
| `COPY package*.json ./` | Copia los archivos de dependencias |
| `RUN npm install` | Instala todas las dependencias |
| `COPY . .` | Copia el código fuente |
| `RUN npm run build` | Compila la app para producción |
| `FROM nginx:alpine` | Segunda etapa: servidor web ligero |
| `COPY --from=build /app/dist ...` | Copia los archivos compilados a nginx |
| `EXPOSE 80` | Expone el puerto 80 |
| `CMD ["nginx", ...]` | Inicia el servidor nginx |

---

## 🚀 Cómo Ejecutar con Docker

```bash
# 1. Clonar el repositorio
git clone https://github.com/LuisGuFer/ProyectoDW.git
cd ProyectoDW/landing-react

# 2. Construir la imagen Docker
docker build -t landing-react .

# 3. Ejecutar el contenedor
docker run -d -p 3000:80 --name landing-react-container landing-react

# 4. Abrir en el navegador
# http://localhost:3000
```

---

## 📌 Comandos Git Utilizados

```bash
# Inicializar repositorio
git init
git add .
git commit -m "primer comit - proyecto react inicial"
git branch -M main
git remote add origin https://github.com/LuisGuFer/ProyectoDW.git
git push -u origin main

# Crear ramas
git checkout -b develop
git push origin develop

git checkout -b feature/configuracion-docker
git push origin feature/configuracion-docker
```

---
