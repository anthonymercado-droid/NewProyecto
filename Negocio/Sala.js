const contenedorSalas = document.getElementById("Salas");
const modalSala = document.getElementById("Modal_Sala");
const tituloModalSala = document.getElementById("tituloModalSala");
const nombresSalas = document.querySelectorAll(".nombre-sala");
const cerrarBtn = document.getElementById("cerrarModalSalaBtn");
const cerrarX = document.getElementById("cerrarModalSalaX");

nombresSalas.forEach((nombre) => {
    nombre.addEventListener("click", () => {
        tituloModalSala.textContent = nombre.textContent;
        modalSala.style.display = "flex";
    })
})

function cerrarModalSala() {
    modalSala.style.display = "none";
}

cerrarBtn.addEventListener("click", cerrarModalSala)
cerrarX.addEventListener("click", cerrarModalSala)

window.addEventListener("click", (e) => {
    if (e.target === modalSala) {
        cerrarModalSala();
    }
})

function crearTarjetaSala(sala) {
    const tarjeta = document.createElement("div");
    tarjeta.classList.add("card_sala");

    tarjeta.innerHTML = `
        <h2 class="nombre-sala">${sala.nombre}</h2>
        <p class="info-sala">Máquinas registradas: ${sala.cantidadMaquinas}</p>
        <p class="info-sala">Haz clic en el nombre para ver detalle</p>
    `;

    const titulo = tarjeta.querySelector(".nombre-sala");
    titulo.addEventListener("click", function () {
        abrirmodalsala(sala);
    });

    contenedorSalas.appendChild(tarjeta);
}