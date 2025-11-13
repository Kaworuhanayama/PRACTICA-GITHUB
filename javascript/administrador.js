document.addEventListener("DOMContentLoaded", () => {
  const tablaBody = document.getElementById("tablaBody");
  const btnBorrar = document.getElementById("btnBorrar");
  const btnEnviar = document.getElementById("btnEnviar");
  const confirmarEnvio = document.getElementById("confirmarEnvio");
  const mensajeCorreo = document.getElementById("mensajeCorreo");

  // Cargar registros
  function cargarRegistros() {
    tablaBody.innerHTML = "";
    const registros = JSON.parse(localStorage.getItem("registros")) || [];
    registros.forEach((r, i) => {
      const fila = `
        <tr>
          <td>${i + 1}</td>
          <td>${r.nombres}</td>
          <td>${r.apellidos}</td>
          <td>${r.fecha}</td>
          <td>${r.nacionalidad}</td>
          <td>${r.correo}</td>
          <td>${r.frecuencia}</td>
        </tr>
      `;
      tablaBody.insertAdjacentHTML("beforeend", fila);
    });
  }

  // Borrar último registro
  btnBorrar.addEventListener("click", () => {
    let registros = JSON.parse(localStorage.getItem("registros")) || [];
    if (registros.length === 0) return alert("No hay registros para borrar.");
    registros.pop();
    localStorage.setItem("registros", JSON.stringify(registros));
    cargarRegistros();
    alert("Último registro eliminado.");
  });

  // Enviar correos
  btnEnviar.addEventListener("click", () => {
    const modal = new bootstrap.Modal(document.getElementById("modalCorreo"));
    modal.show();
  });

  confirmarEnvio.addEventListener("click", () => {
    const contenido = mensajeCorreo.value.trim();
    if (!contenido) {
      alert("Por favor, escribe el contenido del correo.");
      return;
    }
    alert("📧 Correos enviados a todos los suscriptores con el siguiente mensaje:\n\n" + contenido);
    const modal = bootstrap.Modal.getInstance(document.getElementById("modalCorreo"));
    modal.hide();
    mensajeCorreo.value = "";
  });

  cargarRegistros();
});