# TodoList - Actividad 6

## Descripción del proyecto

TodoList es una aplicación web desarrollada para la Actividad 6. El proyecto tiene como objetivo implementar una aplicación para administrar tareas mediante una API REST utilizando Node.js y Express.

La aplicación permite crear, consultar, actualizar y eliminar tareas. Cada tarea contiene un identificador, título, descripción, estado y fecha de creación.

El proyecto también fue preparado para ejecutarse mediante Docker, publicar diferentes versiones de la aplicación en Docker Hub y realizar un despliegue en un servidor remoto.

Durante el desarrollo se implementaron dos versiones:

- Versión 1.0: funcionalidades principales de administración de tareas.
- Versión 2.0: incorpora una mejora funcional de búsqueda y filtrado de tareas.

---

# Tecnologías utilizadas

- Node.js
- Express.js
- HTML5
- CSS3
- JavaScript
- Docker
- Docker Hub
- Git
- GitHub

---

# Requisitos

Para ejecutar el proyecto localmente se necesita tener instalado:

- Node.js
- npm
- Docker Desktop
- Git

---

# Estructura del proyecto

```text
TodoList/
│
├── public/
│   ├── index.html
│   ├── style.css
│   └── app.js
│
├── .dockerignore
├── .gitignore
├── Dockerfile
├── package.json
├── package-lock.json
├── README.md
└── server.js
```

---

# Funcionalidades

## Versión 1.0

La versión 1.0 contiene las funcionalidades principales para administrar las tareas:

- Crear tareas.
- Consultar todas las tareas.
- Consultar una tarea por su ID.
- Actualizar tareas.
- Eliminar tareas.
- Mostrar el identificador de la tarea.
- Mostrar el título.
- Mostrar la descripción.
- Mostrar el estado.
- Mostrar la fecha de creación.

Los estados disponibles son:

- PENDIENTE
- EN PROGRESO
- COMPLETADA

---

# Versión 2.0

La versión 2.0 mantiene las funcionalidades de la versión 1.0 y agrega una mejora funcional para facilitar la búsqueda y administración de las tareas.

Las nuevas funcionalidades son:

- Buscar tareas por título.
- Buscar tareas por descripción.
- Filtrar tareas por estado.
- Mostrar todas las tareas nuevamente.
- Identificación visual de la versión 2.0.

### Búsqueda

El usuario puede escribir una palabra o texto en el campo de búsqueda para encontrar tareas relacionadas con su título o descripción.

### Filtro por estado

El usuario puede seleccionar un estado para mostrar únicamente las tareas que correspondan a:

- PENDIENTE
- EN PROGRESO
- COMPLETADA

También existe la opción:

- Todos los estados

para volver a mostrar todas las tareas.

---

# API REST

La aplicación cuenta con los siguientes endpoints:

| Método | Endpoint | Descripción |
|---|---|---|
| GET | `/api/tareas` | Obtiene todas las tareas |
| GET | `/api/tareas/:id` | Obtiene una tarea específica |
| POST | `/api/tareas` | Crea una nueva tarea |
| PUT | `/api/tareas/:id` | Actualiza una tarea |
| DELETE | `/api/tareas/:id` | Elimina una tarea |

---

# GET /api/tareas

Obtiene todas las tareas registradas.

### Ejemplo

```http
GET /api/tareas
```

### Respuesta

```json
[
  {
    "id": 1,
    "titulo": "Ejemplo de tarea",
    "descripcion": "Esta es una tarea de ejemplo",
    "estado": "PENDIENTE",
    "fechaCreacion": "2026-09-14T00:00:00.000Z"
  }
]
```

---

# GET /api/tareas/:id

Obtiene una tarea específica utilizando su ID.

### Ejemplo

```http
GET /api/tareas/1
```

### Respuesta

```json
{
  "id": 1,
  "titulo": "Ejemplo de tarea",
  "descripcion": "Esta es una tarea de ejemplo",
  "estado": "PENDIENTE",
  "fechaCreacion": "2026-09-14T00:00:00.000Z"
}
```

Si la tarea no existe:

```json
{
  "mensaje": "Tarea no encontrada"
}
```

---

# POST /api/tareas

Permite crear una nueva tarea.

### Ejemplo

```http
POST /api/tareas
```

### Body

```json
{
  "titulo": "Realizar actividad",
  "descripcion": "Completar la Actividad 6",
  "estado": "PENDIENTE"
}
```

### Respuesta

```json
{
  "id": 2,
  "titulo": "Realizar actividad",
  "descripcion": "Completar la Actividad 6",
  "estado": "PENDIENTE",
  "fechaCreacion": "2026-09-14T00:00:00.000Z"
}
```

---

# PUT /api/tareas/:id

Permite actualizar una tarea existente.

### Ejemplo

```http
PUT /api/tareas/2
```

### Body

```json
{
  "titulo": "Actividad 6 terminada",
  "descripcion": "Se completaron las actividades solicitadas",
  "estado": "COMPLETADA"
}
```

---

# DELETE /api/tareas/:id

Permite eliminar una tarea.

### Ejemplo

```http
DELETE /api/tareas/2
```

### Respuesta

```json
{
  "mensaje": "Tarea eliminada correctamente"
}
```

---

# Validaciones

La API cuenta con validaciones para evitar información incorrecta.

## Título obligatorio

El título es obligatorio para crear o actualizar una tarea.

Si no se proporciona un título, la API devuelve:

```json
{
  "mensaje": "El título es obligatorio"
}
```

## Estados permitidos

Solamente se permiten los siguientes estados:

```text
PENDIENTE
EN PROGRESO
COMPLETADA
```

Si se utiliza un estado diferente, la API devuelve:

```json
{
  "mensaje": "Estado no válido"
}
```

## Tarea inexistente

Cuando se intenta consultar, actualizar o eliminar una tarea que no existe, la API devuelve:

```json
{
  "mensaje": "Tarea no encontrada"
}
```

---

# Ejecución local

## 1. Entrar a la carpeta del proyecto

```powershell
cd C:\Users\chris\Documents\TodoList
```

## 2. Instalar dependencias

```powershell
npm install
```

## 3. Ejecutar la aplicación

```powershell
npm start
```

La aplicación estará disponible en:

```text
http://localhost:8080
```

---

# Control de versiones con Git

El proyecto utiliza Git para llevar un control de los cambios realizados durante el desarrollo.

## Verificar cambios

```powershell
git status
```

## Agregar archivos

```powershell
git add .
```

## Crear un commit

```powershell
git commit -m "Actividad 6 - TodoList"
```

## Enviar cambios a GitHub

```powershell
git push
```

El repositorio permite mantener un historial de las modificaciones realizadas durante el desarrollo del proyecto.

---

# Uso de Inteligencia Artificial

Durante el desarrollo de este proyecto se utilizó Inteligencia Artificial como herramienta de apoyo para:

- Comprender conceptos relacionados con Node.js y Express.
- Comprender el funcionamiento de una API REST.
- Resolver dudas relacionadas con Docker.
- Revisar errores durante la ejecución del proyecto.
- Apoyar en la elaboración y revisión del código.
- Comprender el funcionamiento de imágenes y contenedores Docker.
- Organizar la documentación del proyecto.
- Proponer una mejora funcional para la versión 2.0.
- Apoyar en la elaboración del README.

La Inteligencia Artificial fue utilizada como herramienta de apoyo al aprendizaje. Los cambios realizados fueron probados y verificados durante el desarrollo del proyecto.

---

# Versiones del proyecto

## v1.0

La primera versión incluye:

- CRUD de tareas.
- Creación de tareas.
- Consulta de tareas.
- Actualización de tareas.
- Eliminación de tareas.
- Estados de las tareas.
- Fecha de creación.
- API REST.
- Ejecución mediante Docker.
- Publicación de la imagen en Docker Hub.

## v2.0

La segunda versión mantiene las funcionalidades de la versión 1.0 y agrega:

- Búsqueda por título.
- Búsqueda por descripción.
- Filtro por estado.
- Opción para mostrar todos los estados.
- Identificación visual de la versión 2.0.

---

# Mejora funcional implementada

La mejora principal implementada en la versión 2.0 consiste en agregar un sistema de búsqueda y filtrado de tareas.

Anteriormente, en la versión 1.0, el usuario podía visualizar todas las tareas, pero no contaba con una herramienta específica para encontrar rápidamente una tarea.

En la versión 2.0 se agregó un campo de búsqueda que permite buscar por título o descripción.

También se agregó un filtro por estado que permite mostrar únicamente las tareas que se encuentran pendientes, en progreso o completadas.

Esta mejora facilita la administración de las tareas cuando aumenta la cantidad de registros.

---

# Evidencias del proyecto

Como parte de la actividad se documentó mediante capturas de pantalla el proceso de desarrollo, ejecución y despliegue.

Entre las evidencias se incluyen:

- Aplicación funcionando localmente.
- Estructura del proyecto.
- Código de la aplicación.
- Dockerfile.
- Construcción de la imagen Docker.
- Imagen Docker creada.
- Contenedor ejecutándose.
- Logs del contenedor.
- Publicación de la imagen en Docker Hub.
- Versión 1.0.
- Versión 2.0.

Las evidencias complementan la documentación de este README y permiten comprobar los diferentes pasos realizados durante la actividad.

---

# Conclusión

El desarrollo de esta aplicación permitió poner en práctica diferentes conceptos relacionados con el desarrollo de aplicaciones web, APIs REST, control de versiones y contenedores.

Durante el proyecto se utilizó Node.js y Express para crear los servicios de la aplicación y posteriormente Docker para empaquetar y ejecutar el proyecto de una manera más sencilla y organizada.

También se trabajó con Docker Hub para almacenar las diferentes versiones de la aplicación y poder utilizarlas posteriormente durante el despliegue.

La versión 2.0 permitió agregar una mejora funcional mediante la búsqueda y filtrado de tareas, haciendo que la aplicación sea más práctica para el usuario.

El manejo de las versiones 1.0 y 2.0 también permitió comprobar el proceso de actualización y realizar un rollback hacia la versión anterior.

Finalmente, este proyecto permitió comprender mejor cómo una aplicación puede pasar desde un entorno local hasta un entorno de despliegue utilizando herramientas como Git, GitHub, Docker y Docker Hub.

---

# Autor

**Christopher Hernández**

**Actividad 6 - TodoList**

Tecnologías utilizadas:

**Node.js | Express | JavaScript | Docker | Docker Hub | Git | GitHub**