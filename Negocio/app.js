//Obtener las maquinas desde la API

async function obtener_maquinas() {
    try {
        const respuesta = await fetch('/api/get');
        if (!respuesta.ok) throw new error('Error al consultar el servidor')
        const maquinas = await respuesta.json();
        renderTablaInventario(maquinas);
    } catch (error) {
        console.error("error al obtener las maquinas", error);
    }
}

//obtener las maquinas cuando se carga la pagina
window.addEventListener("load", obtener_maquinas);


