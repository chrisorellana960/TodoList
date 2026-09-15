const formTarea = document.getElementById("formTarea");

const listaTareas = document.getElementById("listaTareas");

const busqueda = document.getElementById("busqueda");

const filtroEstado = document.getElementById("filtroEstado");


// Guardar todas las tareas obtenidas de la API

let todasLasTareas = [];


// ==========================================
// CARGAR TAREAS
// ==========================================

async function cargarTareas() {

    try {

        const respuesta = await fetch("/api/tareas");

        const tareas = await respuesta.json();

        todasLasTareas = tareas;

        mostrarTareas();

    } catch (error) {

        console.error(
            "Error al cargar las tareas:",
            error
        );

    }
}


// ==========================================
// MOSTRAR TAREAS
// ==========================================

function mostrarTareas() {

    const textoBusqueda =
        busqueda.value.toLowerCase().trim();

    const estadoSeleccionado =
        filtroEstado.value;


    // Aplicar búsqueda y filtro

    const tareasFiltradas =
        todasLasTareas.filter((tarea) => {

            const coincideBusqueda =

                tarea.titulo
                    .toLowerCase()
                    .includes(textoBusqueda)

                ||

                tarea.descripcion
                    .toLowerCase()
                    .includes(textoBusqueda);


            const coincideEstado =

                estadoSeleccionado === "TODOS"

                ||

                tarea.estado === estadoSeleccionado;


            return coincideBusqueda && coincideEstado;

        });


    listaTareas.innerHTML = "";


    // No existen resultados

    if (tareasFiltradas.length === 0) {

        listaTareas.innerHTML = `
            <div class="sin-resultados">
                No se encontraron tareas.
            </div>
        `;

        return;
    }


    // Mostrar tareas

    tareasFiltradas.forEach((tarea) => {

        const elemento =
            document.createElement("div");

        elemento.className = "tarea";


        elemento.innerHTML = `

            <h3>
                ${tarea.titulo}
            </h3>


            <p>

                <strong>ID:</strong>

                ${tarea.id}

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

                <strong>Fecha de creación:</strong>

                ${new Date(
                    tarea.fechaCreacion
                ).toLocaleString()}

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


// ==========================================
// CREAR TAREA
// ==========================================

formTarea.addEventListener(
    "submit",
    async (evento) => {

        evento.preventDefault();


        const titulo =
            document.getElementById("titulo").value;

        const descripcion =
            document.getElementById("descripcion").value;

        const estado =
            document.getElementById("estado").value;


        try {

            const respuesta = await fetch(
                "/api/tareas",
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({
                        titulo,
                        descripcion,
                        estado
                    })
                }
            );


            const resultado =
                await respuesta.json();


            if (!respuesta.ok) {

                alert(resultado.mensaje);

                return;
            }


            alert(
                "Tarea creada correctamente"
            );


            formTarea.reset();


            cargarTareas();


        } catch (error) {

            console.error(
                "Error al crear tarea:",
                error
            );

        }

    }
);


// ==========================================
// ELIMINAR TAREA
// ==========================================

async function eliminarTarea(id) {

    const confirmar = confirm(
        "¿Deseas eliminar esta tarea?"
    );


    if (!confirmar) {

        return;
    }


    try {

        const respuesta = await fetch(
            `/api/tareas/${id}`,
            {
                method: "DELETE"
            }
        );


        const resultado =
            await respuesta.json();


        alert(resultado.mensaje);


        cargarTareas();


    } catch (error) {

        console.error(
            "Error al eliminar tarea:",
            error
        );

    }

}


// ==========================================
// EDITAR TAREA
// ==========================================

async function editarTarea(id) {

    const tarea =
        todasLasTareas.find(
            (tarea) => tarea.id === id
        );


    if (!tarea) {

        return;
    }


    const nuevoTitulo = prompt(
        "Ingresa el nuevo título:",
        tarea.titulo
    );


    if (!nuevoTitulo) {

        return;
    }


    const nuevaDescripcion = prompt(
        "Ingresa la nueva descripción:",
        tarea.descripcion
    );


    const nuevoEstado = prompt(
        "Estado: PENDIENTE, EN PROGRESO o COMPLETADA",
        tarea.estado
    );


    if (!nuevoEstado) {

        return;
    }


    try {

        const respuesta = await fetch(
            `/api/tareas/${id}`,
            {

                method: "PUT",

                headers: {
                    "Content-Type":
                        "application/json"
                },

                body: JSON.stringify({

                    titulo: nuevoTitulo,

                    descripcion:
                        nuevaDescripcion || "",

                    estado: nuevoEstado

                })

            }
        );


        const resultado =
            await respuesta.json();


        if (!respuesta.ok) {

            alert(resultado.mensaje);

            return;
        }


        alert(
            "Tarea actualizada correctamente"
        );


        cargarTareas();


    } catch (error) {

        console.error(
            "Error al editar tarea:",
            error
        );

    }

}


// ==========================================
// BUSCAR TAREAS
// ==========================================

busqueda.addEventListener(
    "input",
    () => {

        mostrarTareas();

    }
);


// ==========================================
// FILTRAR POR ESTADO
// ==========================================

filtroEstado.addEventListener(
    "change",
    () => {

        mostrarTareas();

    }
);


// ==========================================
// INICIAR APLICACIÓN
// ==========================================

cargarTareas();