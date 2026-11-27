//botones de los lados

const btn_inventario = document.getElementById("inventarioBtn");
const btn_volver = document.getElementById("volverBtn");
const btn_taller = document.getElementById("maquinasBtn");

if (btn_taller) btn_taller.addEventListener("click", () => {
    window.location.href = "taller.html";
});

if (btn_inventario) btn_inventario.addEventListener("click", () => {
    window.location.href = "inventario.html";
});

if (btn_volver) btn_volver.addEventListener("click", () => {
    window.location.href = "index.html";
});