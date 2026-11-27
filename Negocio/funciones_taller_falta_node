// ===================== MÓDULO TALLER =====================

const CLAVES = {
    maquinas: "coinova_maquinas",
    repuestos: "coinova_repuestos",
    ordenes: "coinova_ordenes",
};

const MAQUINAS_INICIALES = [
    { serial: "TRP-001", nombre: "Tragamonedas Fortuna", estado: "Operativa", ubicacion: "Casino Central" },
    { serial: "TRP-002", nombre: "Tragamonedas Fortuna", estado: "No operativa", ubicacion: "Casino Malecón" },
    { serial: "TRP-003", nombre: "Tragamonedas Royal", estado: "Operativa", ubicacion: "Casino Central" },
    { serial: "TRP-004", nombre: "Tragamonedas Royal", estado: "No operativa", ubicacion: "Casino Este" },
];
const REPUESTOS_INICIALES = [
    { id: 1, nombre: "Pantalla LCD 22\"", cantidad: 5, costo: 4500, proveedor: "TecnoCasino SRL" },
    { id: 2, nombre: "Fuente de poder", cantidad: 8, costo: 1800, proveedor: "ElectroPartes" },
    { id: 3, nombre: "Aceptador de billetes", cantidad: 3, costo: 6200, proveedor: "TecnoCasino SRL" },
    { id: 4, nombre: "Botón de juego", cantidad: 20, costo: 150, proveedor: "ElectroPartes" },
];

function leer(clave, valores_iniciales) {
    try {
        const texto = localStorage.getItem(clave);
        if (texto) return JSON.parse(texto);
    } catch (error) {
        console.error("No se pudo leer", clave, error);
    }
    guardar(clave, valores_iniciales);
    return valores_iniciales;
}

function guardar(clave, datos) {
    try {
        localStorage.setItem(clave, JSON.stringify(datos));
    } catch (error) {
        console.error("No se pudo guardar", clave, error);
    }
}

let maquinas = leer(CLAVES.maquinas, MAQUINAS_INICIALES);
let repuestos = leer(CLAVES.repuestos, REPUESTOS_INICIALES);
let ordenes = leer(CLAVES.ordenes, []);
let repuestos_en_orden = []; // repuestos que se van agregando al formulario

// ---------- Utilidades ----------

function esc(texto) {
    return String(texto ?? "").replace(/[&<>"']/g, (c) => (
        { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]
    ));
}

function dinero(numero) {
    return "RD$ " + Number(numero || 0).toLocaleString("es-DO", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
}

function fecha_hoy() {
    return new Date().toLocaleDateString("en-CA"); // AAAA-MM-DD en hora local
}

function resumen_repuestos(lista) {
    if (!lista.length) return "—";
    return lista.map((r) => `${esc(r.nombre)} x${r.cantidad}`).join(", ");
}

const el = (id) => document.getElementById(id);

// ---------- Resumen (tarjetas) ----------

function render_resumen() {
    el("Taller-Operativas").textContent = maquinas.filter((m) => m.estado === "Operativa").length;
    el("Taller-NoOperativas").textContent = maquinas.filter((m) => m.estado === "No operativa").length;
    el("Taller-EnReparacion").textContent = maquinas.filter((m) => m.estado === "En reparación").length;
    const total = ordenes.reduce((suma, o) => suma + o.total, 0);
    el("Taller-CostoTotal").textContent = dinero(total);
}

// ---------- Tabla de órdenes ----------

function render_tabla() {
    const filtro = el("filtroEstado").value;
    const texto = el("buscarTaller").value.trim().toLowerCase();

    const filas = ordenes
        .filter((o) => !filtro || o.estado === filtro)
        .filter((o) => !texto || `${o.serial} ${o.tecnico} ${o.falla}`.toLowerCase().includes(texto))
        .slice()
        .reverse(); // las más recientes primero

    const cuerpo = el("cuerpo-taller");
    if (!filas.length) {
        cuerpo.innerHTML = `<tr><td colspan="9">No hay reparaciones registradas.</td></tr>`;
        return;
    }

    cuerpo.innerHTML = filas.map((o) => {
        const maquina = maquinas.find((m) => m.serial === o.serial);
        const nombre = maquina ? maquina.nombre : "";
        const acciones = o.estado === "En reparación"
            ? `<button type="button" class="btn_reporte" data-accion="finalizar" data-id="${o.id}">Finalizar</button>
               <button type="button" class="btn_reporte" data-accion="noreparable" data-id="${o.id}">No reparable</button>`
            : "";
        return `
            <tr>
                <td>${o.id}</td>
                <td>${esc(o.serial)}<br><small>${esc(nombre)}</small></td>
                <td>${esc(o.tecnico)}</td>
                <td>${esc(o.falla)}</td>
                <td>${resumen_repuestos(o.repuestos)}</td>
                <td>${dinero(o.total)}</td>
                <td><span class="estado ${clase_estado(o.estado)}">${esc(o.estado)}</span></td>
                <td>${esc(o.fecha_inicio)}${o.fecha_fin ? "<br><small>→ " + esc(o.fecha_fin) + "</small>" : ""}</td>
                <td class="acciones">
                    <button type="button" class="btn_reporte" data-accion="historial" data-serial="${esc(o.serial)}">Historial</button>
                    ${acciones}
                </td>
            </tr>`;
    }).join("");
}

function clase_estado(estado) {
    if (estado === "Finalizada") return "ok";
    if (estado === "No reparable") return "bad";
    return "warn";
}

// ---------- Modal: nueva reparación ----------

const modal_orden = el("Modal_Orden");
const modal_historial = el("Modal_Historial");

function llenar_selects_orden() {
    const abiertas = ordenes.filter((o) => o.estado === "En reparación").map((o) => o.serial);
    const libres = maquinas.filter((m) => !abiertas.includes(m.serial));

    el("ordenSerial").innerHTML = libres.length
        ? `<option value="">Seleccione una máquina</option>` +
          libres.map((m) => `<option value="${esc(m.serial)}">${esc(m.serial)} — ${esc(m.nombre)} (${esc(m.estado)})</option>`).join("")
        : `<option value="">No hay máquinas disponibles</option>`;

    const con_stock = repuestos.filter((r) => r.cantidad > 0);
    el("ordenRepuesto").innerHTML = `<option value="">Seleccione un repuesto</option>` +
        con_stock.map((r) => `<option value="${r.id}">${esc(r.nombre)} (disp: ${r.cantidad}) — ${dinero(r.costo)}</option>`).join("");
}

function abrir_modal_orden() {
    el("formOrden").reset();
    repuestos_en_orden = [];
    mostrar_error("");
    llenar_selects_orden();
    render_repuestos_orden();
    modal_orden.style.display = "flex";
}

function cerrar_modal_orden() {
    modal_orden.style.display = "none";
}

function mostrar_error(mensaje) {
    el("ordenError").textContent = mensaje;
}

function agregar_repuesto_a_orden() {
    const id = Number(el("ordenRepuesto").value);
    const cantidad = Number(el("ordenCantidad").value);
    const repuesto = repuestos.find((r) => r.id === id);

    if (!repuesto) return mostrar_error("Seleccione un repuesto.");
    if (!Number.isInteger(cantidad) || cantidad < 1) return mostrar_error("La cantidad debe ser un entero mayor que 0.");

    const ya = repuestos_en_orden.find((r) => r.id === id);
    const total_pedido = (ya ? ya.cantidad : 0) + cantidad;
    if (total_pedido > repuesto.cantidad) {
        return mostrar_error(`Solo hay ${repuesto.cantidad} unidades de "${repuesto.nombre}".`);
    }

    if (ya) ya.cantidad = total_pedido;
    else repuestos_en_orden.push({ id, nombre: repuesto.nombre, cantidad, costo: repuesto.costo });

    mostrar_error("");
    el("ordenCantidad").value = 1;
    render_repuestos_orden();
}

function costo_repuestos_orden() {
    return repuestos_en_orden.reduce((s, r) => s + r.cantidad * r.costo, 0);
}

function render_repuestos_orden() {
    el("listaRepuestosOrden").innerHTML = repuestos_en_orden.length
        ? repuestos_en_orden.map((r, i) => `
            <li>${esc(r.nombre)} x${r.cantidad} — ${dinero(r.cantidad * r.costo)}
                <button type="button" class="btn_reporte" data-quitar="${i}">Quitar</button>
            </li>`).join("")
        : `<li class="vacio">Sin repuestos agregados</li>`;
    actualizar_total_orden();
}

function actualizar_total_orden() {
    const mano_obra = Number(el("ordenManoObra").value) || 0;
    el("ordenTotal").textContent = dinero(costo_repuestos_orden() + mano_obra);
}

function guardar_orden(evento) {
    evento.preventDefault();

    const serial = el("ordenSerial").value;
    const tecnico = el("ordenTecnico").value.trim();
    const falla = el("ordenFalla").value.trim();
    const mano_obra = Number(el("ordenManoObra").value) || 0;

    if (!serial) return mostrar_error("Seleccione una máquina.");
    if (!tecnico || !falla) return mostrar_error("Complete el técnico y la falla.");
    if (mano_obra < 0) return mostrar_error("La mano de obra no puede ser negativa.");

    // Revalidar stock y descontarlo del inventario
    for (const usado of repuestos_en_orden) {
        const repuesto = repuestos.find((r) => r.id === usado.id);
        if (!repuesto || repuesto.cantidad < usado.cantidad) {
            return mostrar_error(`Ya no hay stock suficiente de "${usado.nombre}".`);
        }
    }
    repuestos_en_orden.forEach((usado) => {
        repuestos.find((r) => r.id === usado.id).cantidad -= usado.cantidad;
    });

    const costo_rep = costo_repuestos_orden();
    const siguiente_id = ordenes.reduce((mayor, o) => Math.max(mayor, o.id), 0) + 1;

    ordenes.push({
        id: siguiente_id,
        serial,
        tecnico,
        falla,
        repuestos: repuestos_en_orden.map((r) => ({ ...r })),
        mano_obra,
        costo_repuestos: costo_rep,
        total: costo_rep + mano_obra,
        estado: "En reparación",
        fecha_inicio: fecha_hoy(),
        fecha_fin: null,
    });

    maquinas.find((m) => m.serial === serial).estado = "En reparación";

    guardar(CLAVES.ordenes, ordenes);
    guardar(CLAVES.repuestos, repuestos);
    guardar(CLAVES.maquinas, maquinas);

    cerrar_modal_orden();
    refrescar();
}

// ---------- Cerrar una reparación ----------

function cerrar_orden(id, resultado) {
    const orden = ordenes.find((o) => o.id === id);
    if (!orden || orden.estado !== "En reparación") return;

    orden.estado = resultado; // "Finalizada" o "No reparable"
    orden.fecha_fin = fecha_hoy();

    const maquina = maquinas.find((m) => m.serial === orden.serial);
    if (maquina) maquina.estado = resultado === "Finalizada" ? "Operativa" : "No operativa";

    guardar(CLAVES.ordenes, ordenes);
    guardar(CLAVES.maquinas, maquinas);
    refrescar();
}

// ---------- Historial por máquina ----------

function abrir_historial(serial) {
    const maquina = maquinas.find((m) => m.serial === serial);
    const historial = ordenes.filter((o) => o.serial === serial).slice().reverse();
    const total = historial.reduce((s, o) => s + o.total, 0);

    el("historialTitulo").textContent = `Historial — ${serial}${maquina ? " (" + maquina.nombre + ")" : ""}`;
    el("historialCuerpo").innerHTML = historial.length
        ? `<table class="table_Reportes" style="width:100%;margin:0 0 12px 0">
            <thead><tr><th>Fecha</th><th>Técnico</th><th>Falla</th><th>Repuestos</th><th>Total</th></tr></thead>
            <tbody>${historial.map((o) => `
                <tr>
                    <td>${esc(o.fecha_inicio)}</td>
                    <td>${esc(o.tecnico)}</td>
                    <td>${esc(o.falla)}</td>
                    <td>${resumen_repuestos(o.repuestos)}</td>
                    <td>${dinero(o.total)}</td>
                </tr>`).join("")}
            </tbody></table>
            <p>Costo acumulado de reparaciones: <strong>${dinero(total)}</strong></p>`
        : `<p>Esta máquina no tiene reparaciones registradas.</p>`;

    modal_historial.style.display = "flex";
}

function cerrar_historial() {
    modal_historial.style.display = "none";
}

// ---------- Eventos ----------

function refrescar() {
    render_resumen();
    render_tabla();
}

el("nuevaOrdenBtn").addEventListener("click", abrir_modal_orden);
el("cancelarOrdenBtn").addEventListener("click", cerrar_modal_orden);
el("cerrarHistorialBtn").addEventListener("click", cerrar_historial);
el("agregarRepuestoOrdenBtn").addEventListener("click", agregar_repuesto_a_orden);
el("ordenManoObra").addEventListener("input", actualizar_total_orden);
el("formOrden").addEventListener("submit", guardar_orden);
el("filtroEstado").addEventListener("change", render_tabla);
el("buscarTaller").addEventListener("input", render_tabla);

el("listaRepuestosOrden").addEventListener("click", (e) => {
    const indice = e.target.dataset.quitar;
    if (indice === undefined) return;
    repuestos_en_orden.splice(Number(indice), 1);
    render_repuestos_orden();
});

el("cuerpo-taller").addEventListener("click", (e) => {
    const boton = e.target.closest("button[data-accion]");
    if (!boton) return;
    const accion = boton.dataset.accion;
    if (accion === "historial") abrir_historial(boton.dataset.serial);
    if (accion === "finalizar") cerrar_orden(Number(boton.dataset.id), "Finalizada");
    if (accion === "noreparable") cerrar_orden(Number(boton.dataset.id), "No reparable");
});

window.addEventListener("click", (e) => {
    if (e.target === modal_orden) cerrar_modal_orden();
    if (e.target === modal_historial) cerrar_historial();
});

refrescar();