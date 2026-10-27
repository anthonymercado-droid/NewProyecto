const tabla_inventario = document.getElementById("tabla-inventario");
const cuerpo_tabla = document.getElementById("cuerpo-tabla");

function renderTablaInventario() {
    cuerpo_tabla.innerHTML = "";
    tabla_inventario.forEach(repuesto => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td><input type="checkbox" name="check" id="checkMaquina"></td> 
            <td>${repuesto.ID}</td>
            <td>${repuesto.Nombre}</td>
            <td>${repuesto.Estado}</td>
            <td>${repuesto.Cantidad}</td>
            <td>${repuesto.Proveedor}</td>
        `;
        cuerpo_tabla.appendChild(row);
    });
}

//pintar las filas en la tabla
function renderTablaInventario(maquinas) {
    cuerpo_tabla.innerHTML = "";
    maquinas.forEach(maquina => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td><input type="checkbox" name="check" id="checkMaquina"></td> 
            <td>${maquina.serial}</td>
            <td>${maquina.Nombre}</td>
            <td>${maquina.Estado}</td>
            <td>${maquina.Cantidad}</td>
        `;
        cuerpo_tabla.appendChild(row);
    });
}

