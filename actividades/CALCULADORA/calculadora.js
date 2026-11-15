const pantalla = document.getElementById("pantalla");
const operacionTexto = document.getElementById("operacion");
const indicadorMemoria = document.getElementById("indicador-memoria");
const teclas = document.querySelector(".CALCULADORA");
const simbolosOperacion = {
    "+": "+",
    "-": "−",
    "*": "×",
    "/": "÷",
    "%": "%"
};

const memoriaGuardada = localStorage.getItem("memoria");
let valorActual = "0";
let valorAnterior = null;
let operacionPendiente = null;
let iniciarNuevoNumero = false;
let memoria = memoriaGuardada !== null && Number.isFinite(Number(memoriaGuardada))
    ? Number(memoriaGuardada)
    : 0;
let tieneMemoria = memoriaGuardada !== null && Number.isFinite(Number(memoriaGuardada));

function mostrarValor() {
    pantalla.value = valorActual.replace(".", ",");
}

function formatearNumero(valor) {
    return new Intl.NumberFormat("es-ES", {
        maximumFractionDigits: 10
    }).format(valor);
}

function normalizarNumero(valor) {
    if (!Number.isFinite(valor)) {
        return null;
    }

    return valor === 0 ? "0" : String(Number(valor.toPrecision(12)));
}

function actualizarMemoria() {
    indicadorMemoria.hidden = !tieneMemoria;
}

function limpiarTodo() {
    valorActual = "0";
    valorAnterior = null;
    operacionPendiente = null;
    iniciarNuevoNumero = false;
    operacionTexto.textContent = "";
    mostrarValor();
}

function limpiarEntrada() {
    if (pantalla.value === "Error") {
        limpiarTodo();
        return;
    }

    valorActual = "0";
    iniciarNuevoNumero = false;
    mostrarValor();
}

function escribirDigito(digito) {
    if (pantalla.value === "Error") {
        limpiarTodo();
    }

    if (iniciarNuevoNumero) {
        if (operacionPendiente === null) {
            operacionTexto.textContent = "";
        }
        valorActual = digito;
        iniciarNuevoNumero = false;
    } else if (valorActual.replace(/\D/g, "").length < 14) {
        if (valorActual === "-0") {
            valorActual = digito === "0" ? "-0" : `-${digito}`;
        } else {
            valorActual = valorActual === "0" ? digito : valorActual + digito;
        }
    }

    mostrarValor();
}

function escribirDecimal() {
    if (pantalla.value === "Error") {
        limpiarTodo();
    }

    if (iniciarNuevoNumero) {
        if (operacionPendiente === null) {
            operacionTexto.textContent = "";
        }
        valorActual = "0";
        iniciarNuevoNumero = false;
    }

    if (!valorActual.includes(".")) {
        valorActual += ".";
        mostrarValor();
    }
}

function calcularOperacion(izquierdo, derecho, operador) {
    let resultado;

    switch (operador) {
        case "+":
            resultado = izquierdo + derecho;
            break;
        case "-":
            resultado = izquierdo - derecho;
            break;
        case "*":
            resultado = izquierdo * derecho;
            break;
        case "/":
            if (derecho === 0) {
                mostrarError("No se puede dividir entre cero");
                return null;
            }
            resultado = izquierdo / derecho;
            break;
        default:
            return null;
    }

    const numeroNormalizado = normalizarNumero(resultado);
    if (numeroNormalizado === null) {
        mostrarError("El resultado está fuera de rango");
        return null;
    }

    return numeroNormalizado;
}

function mostrarError(mensaje) {
    pantalla.value = "Error";
    operacionTexto.textContent = mensaje;
    valorActual = "0";
    valorAnterior = null;
    operacionPendiente = null;
    iniciarNuevoNumero = true;
}

function elegirOperacion(operador) {
    if (pantalla.value === "Error") {
        limpiarTodo();
    }

    const numeroActual = Number(valorActual);
    if (operacionPendiente !== null && !iniciarNuevoNumero) {
        const resultado = calcularOperacion(valorAnterior, numeroActual, operacionPendiente);
        if (resultado === null) {
            return;
        }
        valorActual = resultado;
        mostrarValor();
    } else {
        valorAnterior = numeroActual;
    }

    operacionPendiente = operador;
    valorAnterior = Number(valorActual);
    operacionTexto.textContent = `${formatearNumero(valorAnterior)} ${simbolosOperacion[operador]}`;
    iniciarNuevoNumero = true;
}

function calcular() {
    if (operacionPendiente === null || valorAnterior === null || pantalla.value === "Error") {
        return;
    }

    const numeroActual = Number(valorActual);
    const resultado = calcularOperacion(valorAnterior, numeroActual, operacionPendiente);
    if (resultado === null) {
        return;
    }

    operacionTexto.textContent = `${formatearNumero(valorAnterior)} ${simbolosOperacion[operacionPendiente]} ${formatearNumero(numeroActual)} =`;
    valorActual = resultado;
    valorAnterior = null;
    operacionPendiente = null;
    iniciarNuevoNumero = true;
    mostrarValor();
}

function calcularPorcentaje() {
    if (pantalla.value === "Error") {
        limpiarTodo();
    }

    const numeroActual = Number(valorActual);
    const porcentaje = operacionPendiente !== null && valorAnterior !== null
        ? valorAnterior * numeroActual / 100
        : numeroActual / 100;
    const resultado = normalizarNumero(porcentaje);
    if (resultado === null) {
        mostrarError("El porcentaje está fuera de rango");
        return;
    }

    valorActual = resultado;
    iniciarNuevoNumero = true;
    mostrarValor();
}

function cambiarSigno() {
    if (pantalla.value === "Error") {
        limpiarTodo();
    }

    if (iniciarNuevoNumero) {
        if (operacionPendiente === null) {
            operacionTexto.textContent = "";
        }
        valorActual = "0";
        iniciarNuevoNumero = false;
    }

    valorActual = valorActual.startsWith("-") ? valorActual.slice(1) : `-${valorActual}`;
    mostrarValor();
}

function borrarUltimoDigito() {
    if (pantalla.value === "Error" || iniciarNuevoNumero) {
        valorActual = "0";
        iniciarNuevoNumero = false;
    } else {
        valorActual = valorActual.slice(0, -1);
        if (valorActual === "" || valorActual === "-") {
            valorActual = "0";
        }
    }
    mostrarValor();
}

function actualizarMemoriaGuardada() {
    localStorage.setItem("memoria", String(memoria));
    tieneMemoria = true;
    actualizarMemoria();
}

function gestionarMemoria(accion) {
    switch (accion) {
        case "memory-clear":
            localStorage.removeItem("memoria");
            memoria = 0;
            tieneMemoria = false;
            break;
        case "memory-recall":
            if (tieneMemoria) {
                valorActual = normalizarNumero(memoria) || "0";
                iniciarNuevoNumero = true;
                mostrarValor();
            }
            break;
        case "memory-add":
            memoria += Number(valorActual);
            actualizarMemoriaGuardada();
            break;
        case "memory-subtract":
            memoria -= Number(valorActual);
            actualizarMemoriaGuardada();
            break;
        case "memory-store":
            memoria = Number(valorActual);
            actualizarMemoriaGuardada();
            break;
        default:
            return;
    }

    actualizarMemoria();
}

function ejecutarAccion(accion) {
    switch (accion) {
        case "all-clear":
            limpiarTodo();
            break;
        case "clear-entry":
            limpiarEntrada();
            break;
        case "backspace":
            borrarUltimoDigito();
            break;
        case "decimal":
            escribirDecimal();
            break;
        case "equals":
            calcular();
            break;
        case "sign":
            cambiarSigno();
            break;
        case "memory-clear":
        case "memory-recall":
        case "memory-add":
        case "memory-subtract":
        case "memory-store":
            gestionarMemoria(accion);
            break;
        default:
            return;
    }
}

teclas.addEventListener("click", function (evento) {
    const boton = evento.target.closest("button");
    if (boton === null) {
        return;
    }

    if (boton.dataset.digito !== undefined) {
        escribirDigito(boton.dataset.digito);
    } else if (boton.dataset.operacion !== undefined) {
        if (boton.dataset.operacion === "%") {
            calcularPorcentaje();
        } else {
            elegirOperacion(boton.dataset.operacion);
        }
    } else {
        ejecutarAccion(boton.dataset.accion);
    }
});

actualizarMemoria();
mostrarValor();
