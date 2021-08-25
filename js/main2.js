// calcular el monto total a pagar, suponiendo que ya tiene el producto en el carrito


class Producto {
  constructor(nombre, precio, stock = 0) {
    this.nombre = nombre;
    this.precio = precio;
    this.stock = stock;
  }

}

class Carrito {
  constructor(producto) {
    this.producto = producto;
    this.precioEnvio = 0;
    this.subTotal = 0;
    this.formaDePago = 0;
    this.total = 0;

  }

  calcularSubTotal() {

    for (let i = 0; i < this.producto.length; i++) {
      this.subTotal += this.producto[i].precio * this.producto[i].cantidad;
    }

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

  calcularFormaDePago() {
    let campoValido = true;
    do {
      campoValido = true;
      let total = (this.subTotal + this.precioEnvio);
      let opcionPago = parseInt(prompt('Ingrese la forma de pago elgiendo la opcion: 1, 2 o 3 : \n 1- tarjeta 3 cuotas ( 15% interes) \n 2- tarjeta 6 cuotas ( 20% interes) \n 3- debito (5% descuento)'));

      switch (opcionPago) {
        case 1:
          this.formaDePago = total * 0.15 + total;
          break;
        case 2:
          this.formaDePago = total * 0.20 + total;
          break;
        case 3:
          this.formaDePago = total- (total * 0.05 );
          break;
        default:
          campoValido = false;
      }

    } while (campoValido !== true);


  }

  compraFinalizada() {
    alert(`Su compra son los siguientes productos: ${this.ordenarProductosPorPrecio()} \n La suma total es de: $${this.subTotal}. \n Sumando el envio y la forma de pago, hace un total de: $${this.formaDePago}`)
  }
  ordenarProductosPorPrecio() {
    let porductosOrdenados = [...this.producto];
    porductosOrdenados.sort((a, b) => (a.precio - b.precio))

    let respuestaCliente = '';
    for (let i = 0; i < porductosOrdenados.length; i++) {
      respuestaCliente = respuestaCliente.concat(` \n ${porductosOrdenados[i].nombre} precio: $${porductosOrdenados[i].precio} - Cantidad seleccionada: ${porductosOrdenados[i].cantidad} `)
    }
    return respuestaCliente;

  }

  finalizarCompra() {
    this.calcularSubTotal();
    this.calcularEnvio();
    this.calcularFormaDePago();
    this.compraFinalizada();

  }

}

// Creo un listado de productos de esta forma para no pedir por pantalla 
const crearProductos = () => {
  const listadoProdutos = [];
  const nombresProductos = ['cortinas', 'posa vaso', 'centro de mesa', 'tazas verde', 'adorno de pared', 'mantel', 'tapiz'];
  const preciosProductos = [320, 233, 2000, 600, 820, 3000, 2500];
  const stockProdcutos = [2, 21, 6, 34, 23, 12];

  for (let i = 0; i < nombresProductos.length; i++) {
    const productoObjeto = new Producto(nombresProductos[i], preciosProductos[i], stockProdcutos[i]);
    listadoProdutos.push(productoObjeto);
  }

  return listadoProdutos;

}

// simulador de seleccion de productos
const simularSeleccionDeProducto = (productosEnStock) => {
  const compra = [];
  let productoSeleccionado = {}
  for (let i = 0; i < productosEnStock.length; i++) {
    // ((i % 2) === 0) ? productosSeleccionados.push(ListadoProdutos[i] ): null;
    if ((i % 2) === 0) {
      productoSeleccionado = {
        ...productosEnStock[i]
      };
      // productoSeleccionado.cantidad = Math.round(Math.random() * 11);
      productoSeleccionado.cantidad = Math.round(Math.random() * (10 - 1) +1);
      compra.push(productoSeleccionado);
    }
  }
  return compra;
}





//const compra = new Carrito(producto1, 2);
const productosEnStock = crearProductos()
const compra = simularSeleccionDeProducto(productosEnStock);
const carritoCompra = new Carrito(compra)
carritoCompra.finalizarCompra();