// Variables
const btnAgregarCarrito = document.getElementById("lista-productos");
const spanSubTotal = document.getElementById("sub-total");
const btnVaciarCarrito = document.getElementById("vaciar-carrito")
const contenedorCarrito = document.querySelector("#lista-carrito tbody");
let coleccionProductos = [];

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
      console.log(this.producto[i].precio );
    }
   
    spanSubTotal.innerText = this.subTotal;
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
    // this.calcularEnvio();
    // this.calcularFormaDePago();
    // this.compraFinalizada();

  }

}



//FUNCIONES 

// FUNCION CAPTURA CUANDO AGREGAMOS UN ELEMENTO AL CARRITO
function productoSeleccionado(e) {
  e.preventDefault();
  if (e.target.classList.contains("btnAgregarCarrito")) {
    const productoAgregado = e.target.parentElement.parentElement;
    leerDatosDeProducto(productoAgregado);
  }
}
// FUNCION QUE TOMA LOS DATOS DEL HTML Y LOS CONVIETE EN UN OBJETO Y CUENTA LOS PRODUCTOS REPETIDOS
function leerDatosDeProducto(productoAgregado) {
  datoProductos = {
    imagen: productoAgregado.getElementsByTagName("img")[0].src,
    nombre: productoAgregado.getElementsByTagName("h5")[0].textContent,
    precio:parseInt(productoAgregado.getElementsByTagName("p")[0].textContent),
    cantidad: 1
  };

  const existe = coleccionProductos.some(
    (producto) => producto.nombre === datoProductos.nombre
  );

  if (existe) {
    //actualizamos la cantidad
    const productosListaSinCopia = coleccionProductos.map((producto) => {
      if (producto.nombre === datoProductos.nombre) {
        producto.cantidad++;
        return producto;
      } else {
        return producto;
      }
    });
  } else {
    //agrega elemento al arreglo de carrito
    coleccionProductos = [...coleccionProductos, datoProductos];
  }

  console.log(coleccionProductos);
 
  let carrito = new Carrito(coleccionProductos);
  carrito.finalizarCompra();
  carritoHTML();
}

// FUNCION QUE PINTA LO QUE TENEMOS EN EL ARRAY DE PRODUCTOS Y LOS PINTA EN EL HTML
function carritoHTML() {
  // // limpiar el html
  limpiarHTML();
  //recorre el carrito y genera el html
  coleccionProductos.forEach((producto) => {
    const { imagen, nombre, precio, cantidad } = producto;
    const row = document.createElement("tr");
    row.innerHTML = `
      <td><img src='${imagen}' width='100'></td>
      <td>${nombre}</td>
      <td>${precio}</td>
      <td>${cantidad}</td>
      
    `;
    contenedorCarrito.appendChild(row);
  });
}

// FUNCION QUE QUITA ELEMENTO DEL HTML
function limpiarHTML() {
  while (contenedorCarrito.firstChild) {
    contenedorCarrito.removeChild(contenedorCarrito.firstChild);
  }
}

// ADDEVENTLISTENER
btnAgregarCarrito.addEventListener("click", productoSeleccionado);
btnVaciarCarrito.addEventListener("click", ()=>{
    // eliminamos todo el HTML
    limpiarHTML();
});