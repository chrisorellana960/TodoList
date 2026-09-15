const formTarea = document.getElementById("formTarea");
const listaTareas = document.getElementById("listaTareas");

async function cargarTareas() {
    const respuesta = await fetch("/api/tareas");
    const tareas = await respuesta.json();

    listaTareas.innerHTML = "";

    tareas.forEach((tarea) => {

        const elemento = document.createElement("div");

        elemento.className = "tarea";

        elemento.innerHTML = `
            <h3>${tarea.titulo}</h3>

            <p>
                <strong>ID:</strong> ${tarea.id}
            </p>

            <p>
                <strong>Descripción:</strong>
                ${tarea.descripcion || "Sin descripción"}
            </p>

            <p class="estado">
                <strong>Estado:</strong>
                ${tarea.estado}
            </p>

            <p>
                <strong>Fecha:</strong>
                ${new Date(tarea.fechaCreacion).toLocaleString()}
            </p>

            <button
                class="btn-editar"
                onclick="editarTarea(${tarea.id})">
                Editar
            </button>

            <button
                class="btn-eliminar"
                onclick="eliminarTarea(${tarea.id})">
                Eliminar
            </button>
        `;

        listaTareas.appendChild(elemento);
    });
}

formTarea.addEventListener("submit", async (evento) => {

    evento.preventDefault();

    const titulo = document.getElementById("titulo").value;
    const descripcion = document.getElementById("descripcion").value;
    const estado = document.getElementById("estado").value;

    const respuesta = await fetch("/api/tareas", {
        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            titulo,
            descripcion,
            estado
        })
    });

    const resultado = await respuesta.json();

    if (!respuesta.ok) {
        alert(resultado.mensaje);
        return;
    }

    formTarea.reset();

    cargarTareas();
});

async function eliminarTarea(id) {

    const confirmar = confirm(
        "¿Deseas eliminar esta tarea?"
    );

    if (!confirmar) {
        return;
    }

    const respuesta = await fetch(`/api/tareas/${id}`, {
        method: "DELETE"
    });

    const resultado = await respuesta.json();

    alert(resultado.mensaje);

    cargarTareas();
}

async function editarTarea(id) {

    const nuevoTitulo = prompt(
        "Ingresa el nuevo título:"
    );

    if (!nuevoTitulo) {
        return;
    }

    const nuevaDescripcion = prompt(
        "Ingresa la nueva descripción:"
    );

    const nuevoEstado = prompt(
        "Estado: PENDIENTE, EN PROGRESO o COMPLETADA"
    );

    const respuesta = await fetch(`/api/tareas/${id}`, {

        method: "PUT",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            titulo: nuevoTitulo,
            descripcion: nuevaDescripcion || "",
            estado: nuevoEstado
        })
    });

    const resultado = await respuesta.json();

    if (!respuesta.ok) {
        alert(resultado.mensaje);
        return;
    }

    cargarTareas();
}

cargarTareas();