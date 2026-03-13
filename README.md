Prueba Técnica – Gestor de Proyectos

Este proyecto fue desarrollado como parte de la prueba técnica para la posición de Junior Fullstack Developer.
La aplicación implementa un CRUD de proyectos utilizando FastAPI en el backend, PostgreSQL como base de datos y React en el frontend para consumir la API.
El objetivo es demostrar la capacidad de construir una aplicación fullstack básica con comunicación entre frontend, backend y base de datos.


Tecnologías utilizadas

Backend

Python
FastAPI
SQLAlchemy
PostgreSQL

Frontend:

React
Vite

Funcionalidades:

Crear proyectos
Listar proyectos con paginación
Actualizar proyectos
Eliminar proyectos
Manejo básico de errores
Estados de carga en el frontend
Ejecución del proyecto
Backend

Instalar dependencias:

pip install -r requirements.txt

Ejecutar el servidor:

uvicorn main:app --reload

API disponible en:

http://127.0.0.1:8000

Documentación interactiva:

http://127.0.0.1:8000/docs
Frontend

Instalar dependencias:

npm install

Ejecutar aplicación:

npm run dev

Disponible en:

http://localhost:5173
Base de datos

Crear base de datos en PostgreSQL:

CREATE DATABASE crud_db;

Luego actualizar la cadena de conexión en:

backend/main.py
