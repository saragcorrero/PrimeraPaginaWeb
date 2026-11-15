function escribir(valor) {

    let pantalla = document.getElementById("pantalla");

    if (pantalla.value == "0") {
        pantalla.value = valor;
    } else {
        pantalla.value += valor;
    }

}

function calcular() {
    let pantalla = document.getElementById("pantalla");
    pantalla.value = eval(pantalla.value);
}

function borrar() {
    let pantalla = document.getElementById("pantalla");
    pantalla.value = "0";
}

function borrarUltimo() {
    let pantalla = document.getElementById("pantalla");
    pantalla.value = pantalla.value.slice(0, -1);
}

function borrarPantalla() {
    let pantalla = document.getElementById("pantalla");
    pantalla.value = "0";
}

function borrarTodo() {
    let pantalla = document.getElementById("pantalla");
    pantalla.value = "0";
    borrarMemoria();
}

function guardarMemoria() {
    let pantalla = document.getElementById("pantalla");
    localStorage.setItem("memoria", pantalla.value);
}

function borrarMemoria() {
    localStorage.removeItem("memoria");
}
