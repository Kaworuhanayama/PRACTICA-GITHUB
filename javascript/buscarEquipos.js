import { Servicios } from "../servicios/servicios.js";

document.addEventListener("DOMContentLoaded", () => {
  const servicio = new Servicios();
  const tabla = document.getElementById("tabol");

  document.getElementById("btn-buscar").addEventListener("click", mostrar);

  async function mostrar() {
    const nombre = document.getElementById("input-busqueda").value.trim();

    if (!nombre) {
      alert("Ingresa un nombre de equipo");
      return;
    }

    const equipos = await servicio.functionTeams(nombre);
    tabla.innerHTML = "";

    if (!equipos || equipos.length === 0) {
      tabla.innerHTML = "<tr><td colspan='3'>⚠️ No se encontraron equipos</td></tr>";
      return;
    }

    const resultados = equipos.filter(eq =>
      eq.strTeam.toLowerCase().includes(nombre.toLowerCase())
    );

    if (resultados.length === 0) {
      tabla.innerHTML = "<tr><td colspan='3'>⚠️ No hay coincidencias exactas</td></tr>";
      return;
    }

    for (let equipo of resultados) {
      const fila = document.createElement("tr");

      // ====== FOTO ======
      const colFoto = document.createElement("td");
      const img = document.createElement("img");
      img.src = equipo.strBadge || equipo.strLogo || "";
      img.alt = equipo.strTeam;
      img.classList.add("imagen-equipo");
      colFoto.appendChild(img);

      // ====== ENLACES ======
      const colEnlaces = document.createElement("td");
      const redes = {
        Sitio: equipo.strWebsite,
        Facebook: equipo.strFacebook,
        Twitter: equipo.strTwitter,
        Instagram: equipo.strInstagram,
        YouTube: equipo.strYoutube
      };

      let htmlEnlaces = "";
      for (let [nombre, url] of Object.entries(redes)) {
        if (url) {
          const enlace = url.startsWith("http") ? url : `https://${url}`;
          htmlEnlaces += `<a href="${enlace}" target="_blank" class="enlace-red d-block mb-1">${nombre}</a>`;
        }
      }
      colEnlaces.innerHTML = htmlEnlaces || "<em>Sin enlaces</em>";

      // ====== DESCRIPCIÓN ======
      const colDescripcion = document.createElement("td");
      colDescripcion.innerHTML = `
        <strong>${equipo.strTeam}</strong><br>
        <p>${equipo.strDescriptionEN || "No hay descripción disponible."}</p>
      `;

      fila.append(colFoto, colEnlaces, colDescripcion);
      tabla.appendChild(fila);
    }
  }
});