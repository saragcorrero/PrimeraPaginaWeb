function creaMensaje() {
    mensaje = "Mensaje de prueba";

}

var mensaje = "gana la de fuera"

function muestraMensaje() {
    var mensaje = "gana la de dentro";
    alert(mensaje);
}

alert(mensaje);
muestraMensaje();
alert(mensaje);

function foo() {
    var x = 10;
    if (true) {
        var x = 20;  // misma variable!
        console.log(x);  // 20
    }
    console.log(x);  // 20
}

function bar() {
    let y = 10;
    if (true) {
        let y = 20;  // variable diferente
        console.log(y);  // 20
    }
    console.log(y);  // 10
}