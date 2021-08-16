// calcular el monto total a pagar, suponiendo que ya tiene el producto en el carrito
let productosElegidos = 5500;

class Producto {
  constructor(nombre, precio, cantidad) {
    this.nombre = nombre;
    this.precio = precio;
    this.cantidad = cantidad;
  }

}

class Carrito {
  constructor(producto, cantidad) {
    this.producto = producto;
    this.cantidad = cantidad;
    this.precioEnvio = 0;
    this.subTotal = 0; 
    this.formaDePago= 0;
    this.total = 0;

  }

  calcularSubTotal(){
    this.subTotal = this.producto.precio * this.cantidad;
  }

  calcularEnvio() {
    let campoValido;
    do {
      campoValido = true;
      let envio = prompt('Ingrese la forma de envio: \n - Resitencia $330 \n - Corrientes $390\n - Interior (Resto del Pais) $440 \n - Retiro (Por tienda)$0').toLowerCase();

      switch (envio) {
        case "resistencia":
          this.precioEnvio = 330;
          break;
        case "corrientes":
          this.precioEnvio = 390;
          break;
        case "interior":
          this.precioEnvio = 440;
          break;
        case "retiro":
          this.precioEnvio = 0;
          break;
        default:
          campoValido = false;
      }
    } while (campoValido !== true);

  };

  calcularFormaDePago()  {
    let campoValido = true;
    do {
      campoValido = true;
      let total = (this.subTotal + this.precioEnvio );
      let opcionPago = parseInt(prompt('Ingrese la forma de pago elgiendo la opcion: 1, 2 o 3 : \n 1- tarjeta 3 cuotas ( 15% interes) \n 2- tarjeta 6 cuotas ( 20% interes) \n 3- debito (5% descuento)'));

      switch (opcionPago) {
        case 1:
          this.formaDePago = total * 0.15 +total;
          break;
        case 2:
          this.formaDePago = total * 0.20 + total;
          break;
        case 3:
          this.formaDePago =  total * 0.05 - total;
          break;
        default:
          campoValido = false;
      }

    } while (campoValido !== true);


  }

  compraFinalizada(){
    alert(`La compra del producto ${this.producto.nombre} con una cantidad de ${this.producto.cantidad} tien un costo de $${this.subTotal}, sumando el envio y la forma de pago hace un total de $${this.formaDePago}`)
  }

  finalizarCompra() {
    this.calcularSubTotal();
    this.calcularEnvio();
    this.calcularFormaDePago();
    this.compraFinalizada();
    
  }

}

const producto1 = new Producto('Posa Vaso', 230, 3);
const producto2 = new Producto('Tapiz', 2300, 10);


const compra = new Carrito(producto1, 2);
compra.finalizarCompra();

