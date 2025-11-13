import { Servicios } from "../servicios/servicios.js";

let servicio = new Servicios();
const tabla = document.getElementById("tabol");


document.getElementById("btn-buscar").addEventListener("click", mostrar);


async function mostrar() {

    let evento = document.getElementById("input-busqueda").value.trim();

    if (!evento) {
        //toca cambiarlo por un modal pero eso ahorita
        alert("Ingrese el nombre de un encuentro")

    }

    try {
        // 2️⃣ Llamamos a la API usando nuestro servicio
        // En tu clase Servicios debe existir esta función:
        // async functionEvents(nombre) => hace fetch al endpoint searchevents
        const eventos = await servicio.functionEvents(evento);

        // Limpiamos la tabla antes de mostrar resultados
        tabla.innerHTML = "";

        // 3️⃣ Validamos si la API encontró eventos
        if (!eventos) {
            const fila = document.createElement("tr");
            fila.innerHTML = `<td colspan="5">No se encontraron resultados.</td>`;
            tabla.appendChild(fila);
            return;
        }

        // 4️⃣ Recorremos los eventos encontrados y los mostramos en la tabla
        eventos.forEach(e => {
            const fila = document.createElement("tr");

            // Creamos las columnas con los datos más importantes
            const tdNombre = document.createElement("td");
            const tdLiga = document.createElement("td");
            const tdFecha = document.createElement("td");
            const tdEstadio = document.createElement("td");
            const tdResultado = document.createElement("td");
            const tdImagen = document.createElement("td");

            // Llenamos los datos
            tdNombre.textContent = e.strEvent || "Sin nombre";
            tdLiga.textContent = e.strLeague || "Desconocida";
            tdFecha.textContent = e.dateEvent || "No disponible";
            tdEstadio.textContent = e.strVenue || "Sin estadio";
            tdResultado.textContent = e.intHomeScore && e.intAwayScore
                ? `${e.intHomeScore} - ${e.intAwayScore}`
                : "Pendiente";

            // Si hay imagen del evento, la mostramos
            if (e.strThumb) {
                const img = document.createElement("img");
                img.src = e.strThumb;
                img.alt = "Imagen del evento";
                img.width = 150;
                tdImagen.appendChild(img);
            } else {
                tdImagen.textContent = "Sin imagen";
            }

            // Agregamos las columnas a la fila
            fila.appendChild(tdNombre);
            fila.appendChild(tdLiga);
            fila.appendChild(tdFecha);
            fila.appendChild(tdEstadio);
            fila.appendChild(tdResultado);
            fila.appendChild(tdImagen);

            // Finalmente, añadimos la fila a la tabla
            tabla.appendChild(fila);
        });



    } catch (error) {
        console.error("Error al buscar el evento:", error);
    }

}