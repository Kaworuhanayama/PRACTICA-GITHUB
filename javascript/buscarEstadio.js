import { Servicios } from "../servicios/servicios.js";

let servicio = new Servicios();
const tabla = document.getElementById("tabol");

// Evento del botón
document.getElementById("btn-buscar").addEventListener("click", mostrarEstadios);

async function mostrarEstadios() {
    const nombre = document.getElementById("input-busqueda").value.trim();

    if (!nombre) {
        alert("Ingrese el nombre de un estadio");
        return;
    }

    try {
        // Llamada a la API para buscar estadios
        const estadios = await servicio.functionVenues(nombre);

        tabla.innerHTML = "";

        if (!estadios) {
            const fila = document.createElement("tr");
            fila.innerHTML = `<td colspan="6">No se encontraron estadios.</td>`;
            tabla.appendChild(fila);
            return;
        }

        estadios.forEach(e => {
            const fila = document.createElement("tr");

            const tdFoto = document.createElement("td");
            const tdNombre = document.createElement("td");
            const tdCapacidad = document.createElement("td");
            const tdUbicacion = document.createElement("td");
            const tdFundacion = document.createElement("td");
            const tdVideo = document.createElement("td");

            // Foto del estadio
            if (e.strThumb) {
                const img = document.createElement("img");
                img.src = e.strThumb;
                img.alt = "Foto del estadio";
                img.width = 150;
                tdFoto.appendChild(img);
            } else {
                tdFoto.textContent = "Sin imagen";
            }

            tdNombre.textContent = e.strVenue || "Sin nombre";
            tdCapacidad.textContent = e.intCapacity || "Desconocida";
            tdUbicacion.textContent = e.strLocation || "No registrada";
            tdFundacion.textContent = e.dateCreated || "Sin fecha";

            // Botón para ver video en YouTube
            if (e.strYoutube) {
                const btn = document.createElement("button");
                btn.textContent = "Ver video";
                btn.style.backgroundColor = "#c0392b";
                btn.style.color = "white";
                btn.style.padding = "6px 12px";
                btn.style.border = "none";
                btn.style.borderRadius = "6px";
                btn.style.cursor = "pointer";
                btn.addEventListener("click", () => {
                    window.open(e.strYoutube, "_blank");
                });
                tdVideo.appendChild(btn);
            } else {
                tdVideo.textContent = "Sin video";
            }

            fila.appendChild(tdFoto);
            fila.appendChild(tdNombre);
            fila.appendChild(tdCapacidad);
            fila.appendChild(tdUbicacion);
            fila.appendChild(tdFundacion);
            fila.appendChild(tdVideo);

            tabla.appendChild(fila);
        });

    } catch (error) {
        console.error("Error al buscar estadios:", error);
    }
}
