// calcular el monto total a pagar, suponiendo que ya tiene el producto en el carrito
let productosElegidos = 5500;


const calcularEnvio = (costoParcial ) => {
  let campoValido ;
  do {
    campoValido=true;
    let envio = prompt('Ingrese la forma de envio: \n - Resitencia $330 \n - Corrientes $390\n - Interior (Resto del Pais) $440 \n - Retiro (Por tienda)$0').toLowerCase();
   

    switch (envio) {
      case "resistencia":
        costoParcial += 330;
        break;
      case "corrientes":
        costoParcial += 390;
        break;
      case "interior":
        costoParcial += 440;
        break;
      case "retiro":
        costoParcial += 0;
        break;
      default: campoValido = false;
    }
  } while (campoValido !== true);

  return costoParcial;
};

const calcularFormaDePago = (producto) =>{
  let campoValido =  true;
  let costoParcial = 0;
  let total = 0;
  do {
    campoValido =  true;
    let opcionPago = parseInt(prompt('Ingrese la forma de pago elgiendo la opcion: 1, 2 o 3 : \n 1- tarjeta 3 cuotas ( 15% interes) \n 2- tarjeta 6 cuotas ( 20% interes) \n 3- debito (5% descuento)'));
   
    switch (opcionPago) {
      case 1:
        costoParcial = producto + (producto * 0.15);
        break;
      case 2:
        costoParcial = producto + (producto * 0.20);
        break;
      case 3:
        costoParcial = producto - (producto * 0.05);
        break;
      default: campoValido = false;
    }

  } while (campoValido !== true);

  total  =  calcularEnvio(costoParcial);

  return total;

}

const sumaTotalCompra = (producto) =>{
  alert(`El subtotal de tus productos en el carrito es de: $${producto}, a continuacion elija forma de pago y envio`);
  let total =calcularFormaDePago(producto);
  alert(`El total a pagar es de $${total}`);
}

sumaTotalCompra(productosElegidos);