//botones de los lados

const btn_inventario = document.getElementById("inventarioBtn");
const btn_volver = document.getElementById("volverBtn");
const btn_tienda = document.getElementById("TiendaBtn");


btn_inventario.addEventListener("click", () => {
    console.log("Se presiono el boton de inventario");
    window.location.href = "inventario.html";
});

btn_volver.addEventListener("click", () => {
    console.log("Se presiono el boton de volver");
    window.location.href = "index.html";
});

btn_tienda.addEventListener("click", () => {
    console.log("Se presiono el boton de tienda");
    window.location.href = "Tienda.html";
}); 