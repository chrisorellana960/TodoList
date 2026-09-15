const express = require("express");
const path = require("path");

const app = express();

const PUERTO = process.env.PORT || 8080;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Lista de tareas
let tareas = [
  {
    id: 1,
    titulo: "Ejemplo de tarea",
    descripcion: "Esta es una tarea de ejemplo",
    estado: "PENDIENTE",
    fechaCreacion: new Date().toISOString()
  }
];

// GET - Listar todas las tareas
app.get("/api/tareas", (req, res) => {
  res.status(200).json(tareas);
});

// GET - Obtener una tarea por ID
app.get("/api/tareas/:id", (req, res) => {
  const id = Number(req.params.id);

  const tarea = tareas.find((tarea) => tarea.id === id);

  if (!tarea) {
    return res.status(404).json({
      mensaje: "Tarea no encontrada"
    });
  }

  res.status(200).json(tarea);
});

// POST - Crear una tarea
app.post("/api/tareas", (req, res) => {
  const { titulo, descripcion, estado } = req.body;

  if (!titulo || typeof titulo !== "string" || titulo.trim() === "") {
    return res.status(400).json({
      mensaje: "El título es obligatorio"
    });
  }

  const estadosPermitidos = [
    "PENDIENTE",
    "EN PROGRESO",
    "COMPLETADA"
  ];

  const estadoFinal = estado || "PENDIENTE";

  if (!estadosPermitidos.includes(estadoFinal)) {
    return res.status(400).json({
      mensaje: "Estado no válido"
    });
  }

  const nuevaTarea = {
    id: tareas.length > 0
      ? Math.max(...tareas.map((tarea) => tarea.id)) + 1
      : 1,
    titulo: titulo.trim(),
    descripcion: descripcion ? descripcion.trim() : "",
    estado: estadoFinal,
    fechaCreacion: new Date().toISOString()
  };

  tareas.push(nuevaTarea);

  res.status(201).json(nuevaTarea);
});

// PUT - Actualizar una tarea
app.put("/api/tareas/:id", (req, res) => {
  const id = Number(req.params.id);

  const tarea = tareas.find((tarea) => tarea.id === id);

  if (!tarea) {
    return res.status(404).json({
      mensaje: "Tarea no encontrada"
    });
  }

  const { titulo, descripcion, estado } = req.body;

  if (!titulo || typeof titulo !== "string" || titulo.trim() === "") {
    return res.status(400).json({
      mensaje: "El título es obligatorio"
    });
  }

  const estadosPermitidos = [
    "PENDIENTE",
    "EN PROGRESO",
    "COMPLETADA"
  ];

  if (!estadosPermitidos.includes(estado)) {
    return res.status(400).json({
      mensaje: "Estado no válido"
    });
  }

  tarea.titulo = titulo.trim();
  tarea.descripcion = descripcion ? descripcion.trim() : "";
  tarea.estado = estado;

  res.status(200).json(tarea);
});

// DELETE - Eliminar una tarea
app.delete("/api/tareas/:id", (req, res) => {
  const id = Number(req.params.id);

  const indice = tareas.findIndex((tarea) => tarea.id === id);

  if (indice === -1) {
    return res.status(404).json({
      mensaje: "Tarea no encontrada"
    });
  }

  tareas.splice(indice, 1);

  res.status(200).json({
    mensaje: "Tarea eliminada correctamente"
  });
});

// Iniciar servidor
app.listen(PUERTO, () => {
  console.log(`TodoList ejecutándose en http://localhost:${PUERTO}`);
});