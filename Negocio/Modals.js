// Modales para agregar máquina y repuesto
const modal_maquina = document.getElementById("Modal_Maquina");
const modal_repuesto = document.getElementById("Modal_Repuesto");
const modal_reporte = document.getElementById("Modal_Reporte")

//Maquina
function abrir_modal_maquina() {
    if (modal_maquina) modal_maquina.style.display = "flex";
}

function cerrar_modal_maquina() {
    if (modal_maquina) modal_maquina.style.display = "none";
}

//Repuesto

function abrir_modal_repuesto() {
    if (modal_repuesto) modal_repuesto.style.display = "flex";
}

function cerrar_modal_repuesto() {
    if (modal_repuesto) modal_repuesto.style.display = "none";
}

//Reportes

function abrir_modal_reporte() {
    if (modal_reporte) modal_reporte.style.display = "flex";
}

function cerrar_modal_reporte() {
    if (modal_reporte) modal_reporte.style.display = "none";
}



// Cerrar cualquier modal al hacer clic en el fondo oscuro
window.addEventListener("click", (e) => {
    if (e.target === modal_maquina) cerrar_modal_maquina();
    if (e.target === modal_repuesto) cerrar_modal_repuesto();
    if (e.target === modal_reporte) cerrar_modal_reporte();
});

//Maquinas

const agregar_maquina = document.getElementById("agregarBtn");
if (agregar_maquina) agregar_maquina.addEventListener("click", abrir_modal_maquina);

const cancelar_maquina = document.getElementById("cancelarBtn");
if (cancelar_maquina) cancelar_maquina.addEventListener("click", cerrar_modal_maquina);

//Repuestos

const agregar_repuesto = document.getElementById("agregarRepuestoBtn");
if (agregar_repuesto) agregar_repuesto.addEventListener("click", abrir_modal_repuesto);

const cancelar_repuesto = document.getElementById("cancelarRepuestoBtn");
if (cancelar_repuesto) cancelar_repuesto.addEventListener("click", cerrar_modal_repuesto);

//reporte

const abrir_reporte = document.getElementById("abrir_modal_reporte");
if (abrir_reporte) abrir_reporte.addEventListener("click", abrir_modal_reporte)

const cerrar_reporte = document.getElementById("cerrar_modal_reporte")
if (cerrar_reporte) cerrar_reporte.addEventListener("click", cerrar_modal_reporte)




