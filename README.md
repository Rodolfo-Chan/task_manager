# 📋 Task Manager - Frontend

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Redux](https://img.shields.io/badge/Redux-764ABC?style=for-the-badge&logo=redux&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white)

Aplicación web para gestión de tareas con autenticación de usuarios, CRUD de tareas y filtros avanzados.
![App Screenshot](https://via.placeholder.com/468x300?text=App+Screenshot+Here)

---

## ✨ Funcionalidades

### 🔐 Autenticación
- ✔ Registro de usuarios
- ✔ Inicio de sesión con JWT
- ✔ Persistencia de token en `localStorage`

### 📝 Gestión de Tareas
- ✔ CRUD completo (Crear, Leer, Actualizar, Eliminar)
- ✔ Filtros avanzados (por estado, fecha, prioridad)
- ✔ Búsqueda en tiempo real

### 🛡 Seguridad
- ✔ Rutas privadas (`PrivateRoute`)
- ✔ Protección de endpoints

### 🎨 Interfaz de Usuario
- ✔ Diseño responsive con Tailwind CSS
- ✔ Notificaciones de acciones
- ✔ Carga optimizada

---

## ⚙️ Tecnologías Utilizadas

| Categoría        | Tecnologías              |
|------------------|--------------------------|
| **Frontend**     | React (Vite)             |
| **Estado Global**| Redux Toolkit            |
| **Routing**      | React Router DOM         |
| **Estilos**      | Tailwind CSS             |
| **Iconos**       | React Icons              |
| **Autenticación**| JSON Web Tokens (JWT)    |

---

## 📥 Instalación

### 1. Clona el repositorio

```bash
git clone https://github.com/Rodolfo-Chan/task_manager.git
cd frontend-task-manager
```
### 2. Instala las dependencias
```bash
npm install
# o
yarn install

```
### 3. Configuración del entorno
```bash
src/features/auth/authAPI.ts
const BASE_URL = 'https://tu-backend-api.com'; // Reemplaza con tu URL
```
## 🚀 Uso
🧪 Modo Desarrollo / http://localhost:5173/
```bash
npm run dev
# o
yarn dev

```
## ☁️ Despliegue (Netlify)
Crea un archivo public/_redirects con el siguiente contenido:
```bash
/* /index.html 200

```
## 🔐 Variables de entorno
Configura en Netlify:
```bash
VITE_API_URL=https://tu-backend-api.com


```
