import { Servicios } from "../servicios/servicios.js";

const servicio = new Servicios();
const tabla = document.getElementById("tabol");
const boton = document.getElementById("btn-buscar");

boton.addEventListener("click", mostrarJugadores);

async function mostrarJugadores() {
  const nombre = document.getElementById("input-busqueda").value.trim();
  if (!nombre) {
    alert("Ingrese el nombre de un jugador");
    return;
  }

  try {
    const jugadores = await servicio.functionPlayers(nombre);
    tabla.innerHTML = "";

    if (!jugadores) {
      tabla.innerHTML = `<tr><td colspan="6">No se encontraron jugadores.</td></tr>`;
      return;
    }

    jugadores.forEach(j => {
      const fila = document.createElement("tr");
      fila.innerHTML = `
        <td>${j.strThumb ? `<img src="${j.strThumb}" width="100">` : "Sin imagen"}</td>
        <td>${j.strPlayer || "Desconocido"}</td>
        <td>${j.dateBorn || "No disponible"}</td>
        <td>${j.strNationality || "No registrada"}</td>
        <td>${j.strStatus || "Sin estado"}</td>
        <td>${j.strTeam || "Sin equipo"}</td>
      `;
      tabla.appendChild(fila);
    });
  } catch (error) {
    console.error("Error al buscar jugadores:", error);
  }
}
