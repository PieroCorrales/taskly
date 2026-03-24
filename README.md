# Taskly

(screenshots/app.png)

Gestor de tareas fullstack con autenticación JWT.

Proyecto de portfolio que demuestra el desarrollo de una API REST con Node.js y Express, autenticación segura con JWT, y una base de datos MongoDB — con frontend en React próximamente.

---




## Stack

**Backend**
- Node.js + Express
- MongoDB + Mongoose
- JWT (jsonwebtoken)
- bcryptjs
- dotenv

**Frontend**
- React + Vite *(completado)*
- Axios
- React Router

---

## Funcionalidades

### Implementadas
- Registro e inicio de sesión con JWT
- Contraseñas hasheadas con bcrypt
- CRUD completo de tareas por usuario autenticado
- Cada usuario solo accede a sus propias tareas
- Interfaz React con login, registro y dashboard de tareas
- Filtrado visual de tareas completadas / pendientes

### Próximamente
- Despliegue

---

## Instalación y uso

### Requisitos
- Node.js v18+
- MongoDB corriendo localmente

### Backend
```bash
cd backend
npm install
```

Crea un archivo `.env` en `/backend` con:
```
PORT=5000
JWT_SECRET=tu_clave_secreta
MONGO_URI=mongodb://localhost:27017/taskly
```

Arranca el servidor:
```bash
npm run dev
```

La API estará disponible en `http://localhost:5000`

---

## Endpoints de la API

### Autenticación

| Método | Ruta | Descripción |
|--------|------|-------------|
| POST | `/api/auth/register` | Registro de usuario |
| POST | `/api/auth/login` | Login, devuelve token JWT |

### Tareas *(requieren token JWT)*

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/tasks` | Listar tareas del usuario |
| POST | `/api/tasks` | Crear tarea |
| PUT | `/api/tasks/:id` | Actualizar tarea |
| DELETE | `/api/tasks/:id` | Eliminar tarea |

Las rutas de tareas requieren el header:
```
Authorization: Bearer TU_TOKEN
```

---

## Seguridad

- Contraseñas nunca almacenadas en texto plano
- Tokens JWT firmados con clave secreta en variables de entorno
- Verificación de propiedad en cada operación sobre tareas

**Mejoras futuras:** validación de inputs con express-validator, rate limiting, refresh tokens, restricción de CORS por dominio.

---

## Autor

[Piero Corrales](https://github.com/PieroCorrales) · [LinkedIn](https://linkedin.com/in/piero-corrales)