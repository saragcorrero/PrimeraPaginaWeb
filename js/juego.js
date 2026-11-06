let jugador = "piedra";
let maquina = "papel";

let mensaje;

if (jugador === maquina) {
    mensaje = "Empate";
} else if (jugador === "piedra" && maquina === "tijera") {
    mensaje = "Ganaste";
} else if (jugador === "papel" && maquina === "piedra") {
    mensaje = "Ganaste";
} else if (jugador === "tijera" && maquina === "papel") {
    mensaje = "Ganaste";
} else {
    mensaje = "Perdiste";
}
console.log(mensaje);
