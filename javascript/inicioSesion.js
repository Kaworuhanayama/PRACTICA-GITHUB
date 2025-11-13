
 document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("loginForm");

    form.addEventListener("submit", (event) => {
      event.preventDefault(); // Evita recargar la página

      const correo = document.getElementById("correo").value.trim();
      const pass = document.getElementById("passw").value.trim();

      // Valida credenciales
      if (correo === "admin@gmail.com" && pass === "1234") {
        window.location.href = "administrador.html"; // ✅ Redirige correctamente
      } else {
        alert("Correo o contraseña incorrectos ❌");
      }
    });
  });