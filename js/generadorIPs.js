
function mostrarDireccionRed() {
document.getElementById("ip").textContent = "192.168.1.0";
}

function mostrarPuertaEnlace() {
document.getElementById("ip").textContent = "192.168.1.1";
}

function generarIP() {

let numero_aleatorio = "192.168.1." + Math.floor(Math.random() * 253 + 2);
document.getElementById("ip").textContent = numero_aleatorio;

}

function mostrarBroadcast() {
document.getElementById("ip").textContent = "192.168.1.255";
}

function mostrarMascara() {
document.getElementById("ip").textContent = "255.255.255.0";
}
