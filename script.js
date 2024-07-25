const dropdownElementList = document.querySelectorAll('.dropdown-toggle')
const dropdownList = [...dropdownElementList].map(dropdownToggleEl => new bootstrap.Dropdown(dropdownToggleEl))

const myModal = document.getElementById('myModal')
const myInput = document.getElementById('myInput')

myModal.addEventListener('shown.bs.modal', () => {
    // myInput.focus()
})

let selectOption = '';

let actividades = []
let nombre = ''
let tipo = ''
let index = ''

const iconosActividades = {
    "Ejercicio": '<i class="fa-solid fa-person-swimming"></i>',
    "Bañarse": '<i class="fa-solid fa-shower"></i>',
    "Hacer Aseo": '<i class="fa-solid fa-hands-bubbles"></i>',
    "Ir al Medico": '<i class="fa-solid fa-stethoscope"></i>',
    "Trabajar": '<i class="fa-solid fa-sack-dollar"></i>',
    "Lavar Ropa": '<i class="fa-solid fa-shirt"></i>',
    "Comer": '<i class="fa-solid fa-utensils"></i>',
    "Tarea": '<i class="fa-regular fa-file-word"></i>',
    "Jugar": '<i class="fa-solid fa-gamepad"></i>'
};


document.getElementById("Ejercicio").addEventListener("click", () => {
    nombre = "Ejercicio"
    tipo = iconosActividades.Ejercicio
})

document.getElementById("Bañarse").addEventListener("click", () => {
    nombre = "Bañarse"
    tipo = iconosActividades.Bañarse
})
document.getElementById("Aseo").addEventListener("click", () => {
    nombre = "Hacer Aseo"
    tipo = iconosActividades["Hacer Aseo"]
})
document.getElementById("medico").addEventListener("click", () => {
    nombre = "Ir al Medico"
    tipo = iconosActividades["Ir al Medico"]
})
document.getElementById("Trabajar").addEventListener("click", () => {
    nombre = "Trabajar"
    tipo = iconosActividades.Trabajar
})
document.getElementById("LavarRopa").addEventListener("click", () => {
    nombre = "Lavar Ropa"
    tipo = iconosActividades["Lavar Ropa"]
})
document.getElementById("Comer").addEventListener("click", () => {
    nombre = "Comer"
    tipo = iconosActividades.Comer
})
document.getElementById("Tarea").addEventListener("click", () => {
    nombre = "Tarea"
    tipo = iconosActividades.Tarea
})
document.getElementById("Jugar").addEventListener("click", () => {
    nombre = "Jugar"
    tipo = iconosActividades.Jugar
})



//al apretar boton agregar nueva actividad
document.getElementById("agregarActividad").addEventListener('click', () => {


    let actividad = {};
    let hora = document.getElementById("hora").value;

    actividad.hora = hora
    actividad.nombre = nombre
    nombre = ''
    actividad.icono = tipo

    actividades.push(actividad)
    crearActividad(actividades)
})

function crearActividad(actividades) {
    let filaTabla = ''
    for (let i = 0; i < actividades.length; i++) {
        filaTabla += `
        <tr>
            <td>${actividades[i].hora}</td>
            <td style="width:10rem;">${actividades[i].nombre}</td>
            <td>${actividades[i].icono}</td>
            <td class="ms-0">
            <button class="btn btn-success eliminar" id="eliminar" data-index="${i}">Completada</button>
            </td>
        </tr>
        `
    }
    document.getElementById("body").innerHTML = filaTabla
}

document.getElementById("body").addEventListener('click', (event) => {
    if (event.target && event.target.classList.contains('eliminar')) {
        const index = event.target.getAttribute('data-index'); // Obtener el índice del atributo data-index
        if (index !== null) {
            // Convertir el índice a número
            const numIndex = parseInt(index, 10);

            // Eliminar la actividad del arreglo
            actividades.splice(numIndex, 1);

            // Volver a crear la tabla con las actividades actualizadas
            crearActividad(actividades);
        }
    }
});
