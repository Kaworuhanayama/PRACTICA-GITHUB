document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nombres = document.getElementById("nombres").value;
    const apellidos = document.getElementById("apellidos").value;
    const fecha = document.getElementById("fecha").value;
    const nacionalidad = document.getElementById("nacionalidad").value;
    const correo = document.getElementById("correo").value;
    const frecuencia = document.querySelector("input[name='frecuencia']:checked")?.id || "No especificado";

    const nuevoRegistro = { nombres, apellidos, fecha, nacionalidad, correo, frecuencia };

    const registros = JSON.parse(localStorage.getItem("registros")) || [];
    registros.push(nuevoRegistro);
    localStorage.setItem("registros", JSON.stringify(registros));

    alert("✅ Registro guardado correctamente.");
    form.reset();
  });
});