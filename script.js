const dropdownElementList = document.querySelectorAll('.dropdown-toggle')
const dropdownList = [...dropdownElementList].map(dropdownToggleEl => new bootstrap.Dropdown(dropdownToggleEl))

const myModal = document.getElementById('myModal')
const myInput = document.getElementById('myInput')


$(document).ready(function () {
    $('.dropdown-item').on('click', function () {
        var selectedText = $(this).text();
        $('#dropdownMenuButton').text(selectedText);
    });
});



function creandoFecha() {
    const fechaActual = new Date();
    const dia = fechaActual.getDate();
    const mes = fechaActual.getMonth() + 1;
    const anio = fechaActual.getFullYear();
    const hora = fechaActual.getHours();
    const min = fechaActual.getMinutes();

    let cambioValue = document.getElementById("reloj");
    cambioValue.innerText = `${hora} : ${min}  `

}
setInterval(creandoFecha, 1000);


myModal.addEventListener('shown.bs.modal', () => {
    // myInput.focus()
})
creandoFecha();
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

//cargamos la pagina y se recupera las actividades del localstorage

document.addEventListener("DOMContentLoaded", () => {
    const savedActividades = localStorage.getItem("actividades");
    if (savedActividades) {
        actividades = JSON.parse(savedActividades);
        crearActividad(actividades);
    }
})

//al apretar boton agregar nueva actividad
document.getElementById("agregarActividad").addEventListener('click', () => {


    let actividad = {};
    let hora = document.getElementById("hora").value;
    let fecha = document.getElementById("fecha").value

    let fechas = fecha.split("-")
    fecha = `${fechas[2]}/${fechas[1]}/${fechas[0]}`
    // console.log("🚀 ~ document.getElementById ~ fecha:", fecha)

    actividad.fecha = fecha
    actividad.hora = hora

    actividad.nombre = nombre
    nombre = ''
    actividad.icono = tipo

    actividades.push(actividad)
    // Actualizar el localStorage
    guardarLS();
    crearActividad(actividades)
})


function crearActividad(actividades) {
    let filaTabla = ''
    for (let i = 0; i < actividades.length; i++) {
        filaTabla += `
        <tr>
            <td>${actividades[i].fecha}</td>
            <td>${actividades[i].hora}</td>
            <td style="width:10rem;">${actividades[i].nombre}</td>
            <td>${actividades[i].icono}</td>
            <td class="ms-0">
            <audio id="buttonSound" src="assets/sounds/logrado.mp3"></audio>
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


            // Actualizar el localStorage
            guardarLS();

            // Volver a crear la tabla con las actividades actualizadas
            crearActividad(actividades);

            //agregar sonido de logrado
            let audio = document.getElementById("buttonSound")
            audio.volume=0.2;
            audio.play()


        }
    }
});


// window.onload=creandoFecha;

function guardarLS() {
    localStorage.setItem("actividades", JSON.stringify(actividades));
}

// ------------------------------------------------------------------------------
const url = 'https://api.weatherapi.com/v1/current.json?key=6368cc77d3f7439181b05922242607&q=Valparaiso&aqi=no';
const options = {
    "Connection": "keep-alive",
    "Vary": "Accept-Encoding",
    "CDN-PullZone": "93447",
    "CDN-Uid": "8fa3a04a-75d9-4707-8056-b7b33c8ac7fe",
    "CDN-RequestCountryCode": "GB",
    "Age": "0",
    "x-weatherapi-qpm-left": "5000000",
    "CDN-ProxyVer": "1.04",
    "CDN-RequestPullSuccess": "True",
    "CDN-RequestPullCode": "200",
    "CDN-CachedAt": "07/26/2024 02:41:53",
    "CDN-EdgeStorageId": "1049",
    "CDN-Status": "200",
    "CDN-RequestId": "f2325c5113421b683be69931ecd3aef8",
    "CDN-Cache": "MISS",
    "Accept-Ranges": "bytes",
    "Content-Length": "781",
    "Cache-Control": "public, max-age=180",
    "Content-Type": "application/json",
    "Date": "Fri, 26 Jul 2024 02:41:53 GMT",
    "Server": "BunnyCDN-DE1-756",
    "Via": "1.1 varnish (Varnish/6.0)"

};

fetch(url, options)
    .then(res => res.json())
    .then(response => {
        crearClima(response)
    })
    .catch(err => console.error(err));

function crearClima(response) {
    let ciudad = '';
    let clima = '';
    let temperatura = '';

    ciudad = response.location.name
    temperatura = response.current.temp_c + "°C"
    clima = response.current.condition.icon
    let llenar = document.getElementById("ciudad")
    llenar.innerText = `${ciudad}`;
    let climaTemp = document.getElementById("clima")

    climaTemp.innerHTML = `${temperatura} <img src="${clima}" alt="">`;

}
setInterval(crearClima, 100000);

// ------------------------------------------------------------------------------
