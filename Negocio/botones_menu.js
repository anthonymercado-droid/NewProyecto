//botones de los lados

const btn_inventario = document.getElementById("inventarioBtn");
const btn_volver = document.getElementById("volverBtn");

btn_inventario.addEventListener("click", () => {
    console.log("Se presiono el boton de inventario");
    window.location.href = "inventario.html";
});

btn_volver.addEventListener("click", () => {
    console.log("Se presiono el boton de volver");
    window.location.href = "index.html";
});


