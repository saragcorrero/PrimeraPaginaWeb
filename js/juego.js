let partidas = 0;
let victorias = 0;
let empates = 0;
let derrotas = 0;

function juego(jugador) {
  const opciones = ["piedra", "papel", "tijera"];
  const maquina = opciones[Math.floor(Math.random() * opciones.length)];
  let mensaje;

  partidas++;

  if (jugador === maquina) {
    mensaje = "Empate";
    empates++;
  } else if (
    (jugador === "piedra" && maquina === "tijera") ||
    (jugador === "papel" && maquina === "piedra") ||
    (jugador === "tijera" && maquina === "papel")
  ) {
    mensaje = "Ganaste";
    victorias++;
  } else {
    mensaje = "Perdiste";
    derrotas++;
  }
  document.getElementById("jugada-jugador").textContent =
    `Tu jugada es: ${jugador}`;
  document.getElementById("jugada-maquina").textContent =
    `La jugada de la máquina es: ${maquina}`;
  document.getElementById("mensaje").textContent = mensaje;

  document.getElementById("marcador").textContent = `Partidas: ${partidas}`;
  document.getElementById("victorias").textContent = `Victorias: ${victorias}`;
  document.getElementById("empates").textContent = `Empates: ${empates}`;
  document.getElementById("derrotas").textContent = `Derrotas: ${derrotas}`;
}
