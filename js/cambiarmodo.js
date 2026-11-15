const CLAVE_TEMA = "primeraPaginaWeb-tema";
const botonTema = document.createElement("button");
botonTema.type = "button";
botonTema.className = "BOTON-TEMA";
botonTema.setAttribute("aria-label", "Cambiar entre modo claro y oscuro");

function aplicarTemaOscuro(activar) {
    document.body.classList.toggle("MODO-OSCURO", activar);
    botonTema.textContent = activar ? "☀️ Modo claro" : "🌙 Modo oscuro";
    botonTema.setAttribute("aria-pressed", String(activar));
}

botonTema.addEventListener("click", function () {
    const activar = !document.body.classList.contains("MODO-OSCURO");
    localStorage.setItem(CLAVE_TEMA, activar ? "oscuro" : "claro");
    aplicarTemaOscuro(activar);
});

document.body.appendChild(botonTema);
aplicarTemaOscuro(localStorage.getItem(CLAVE_TEMA) === "oscuro");