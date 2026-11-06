//let mensaje = "Hola Mundo!";

//alert("Esta página dice" + "\n" + "\n"  + mensaje + "\n" + "Que facil es incluir  \' comillas simples \'" + "\n" + "y" + " \"comillas dobles\"");

//console.error(mensaje); 

//let miArray = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];


//for (let i = 0; i < miArray.length; i++) {
//    console.log(miArray[i]);
//    alert("Esta página dice" + "\n" + "\n" + miArray[i]);
//}

//var valores = [true, 5, false, "hola", "adios", 2];

//for (let i = 0; i < 1; i++) {
 //   if (valores[4] < valores[5]) {
 //       alert("La palabra 'adios' en la posición 4 es menor que el número 2 en la posición 5");
  //  } else {
    //    alert("El número 2 en la posición 5 es mayor que la palabra 'adios' en la posición 4");
   // }
//}

//var precio = 20;

//var impuesto = 1.21;

//var gastosEnvio = 10;

//var precioTotal;

//precioTotal = (precio * impuesto) + gastosEnvio;

//console.log(precioTotal);

//var producto2 = 30;

//var impuestos = 1.21;

//var gastosEnvio = 10;

//precioTotal = (producto2*impuestos)+gastosEnvio;

//console.log(precioTotal);

function CalculaImpuesto (producto){
    var impuesto = 1.21;
    var gastosEnvio = 10;
    var precioTotal;

    precioTotal = (producto * impuesto) + gastosEnvio;

    return precioTotal;
}

var precioTotal1 = CalculaImpuesto(20);
var precioTotal2 = CalculaImpuesto(30);

console.log(precioTotal1);
console.log(precioTotal2);

var OPCIONES = [1.21, 10, 5];

var Opciones1 = OPCIONES[0]