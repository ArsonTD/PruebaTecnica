# Gestor de Tareas Colaborativo – Prueba Técnica

## Tecnologías implementadas

Backend
- FastAPI
- PostgreSQL
- SQLAlchemy

Frontend
- React (Vite)

## Funcionalidades implementadas

- CRUD de proyectos
- Paginación
- Manejo de errores
- Carga de estados
- Conexión API con PostgreSQL

## Configuración del backend

1. Crear entorno virtual

python -m venv venv

2. Activar el entorno

Windows:
venv\Scripts\activate

3. Instalar dependencias

pip install fastapi uvicorn sqlalchemy psycopg2-binary

4. Ejecutar el backend

uvicorn main:app --reload

Servidor en:

http://127.0.0.1:8000

## Configuración del frontend

Instalar dependencias:

npm install

Ejecutar el frontend:

npm run dev

La aplicación se ejecuta en:

http://localhost:5173

## Base de datos

Se requiere una base de datos PostgreSQL.

Ejemplo:

CREATE DATABASE crud_db;

Actualice la cadena de conexión en:

backend/main.py