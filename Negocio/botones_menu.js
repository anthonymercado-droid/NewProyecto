//botones de los lados

const btn_inventario = document.getElementById("inventarioBtn");
const btn_volver = document.getElementById("volverBtn");
const btn_tienda = document.getElementById("TiendaBtn");
const btn_Salas = document.getElementById("SalasBtn");
const btn_taller = document.getElementById("tallerBtn");


if (btn_inventario)
    btn_inventario.addEventListener("click", () => {
        console.log("Se presiono el boton de inventario");
        window.location.href = "inventario.html";
    });

if (btn_volver)
    btn_volver.addEventListener("click", () => {
        console.log("Se presiono el boton de volver");
        window.location.href = "index.html";
    });

if (btn_tienda)
    btn_tienda.addEventListener("click", () => {
        console.log("Se presiono el boton de tienda");
        window.location.href = "Tienda.html";
    });

if (btn_Salas)
    btn_Salas.addEventListener("click", () => {
        console.log("Se presiono el boton de la sala de Juegos;")
        window.location.href = "Sala.html";
    });

if (btn_taller)
    btn_taller.addEventListener("click", () => {
        console.log("Se presiono el boton del taller");
        window.location.href = "taller.html";
    });