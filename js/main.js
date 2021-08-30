// Variables
const btnAgregarCarrito = document.getElementById("lista-productos");
const spanSubTotal = document.getElementById("sub-total");
const btnVaciarCarrito = document.getElementById("vaciar-carrito");
const contenedorCarrito = document.querySelector("#lista-carrito tbody");
const btnCalcularEnvio = document.querySelector("#calcular-envio");

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
    }

    spanSubTotal.innerText = this.subTotal;
  }

  calcularFormaDePago() {
    let campoValido = true;
    do {
      campoValido = true;
      let total = this.subTotal + this.precioEnvio;
      let opcionPago = parseInt(
        prompt(
          "Ingrese la forma de pago elgiendo la opcion: 1, 2 o 3 : \n 1- tarjeta 3 cuotas ( 15% interes) \n 2- tarjeta 6 cuotas ( 20% interes) \n 3- debito (5% descuento)"
        )
      );

      switch (opcionPago) {
        case 1:
          this.formaDePago = total * 0.15 + total;
          break;
        case 2:
          this.formaDePago = total * 0.2 + total;
          break;
        case 3:
          this.formaDePago = total - total * 0.05;
          break;
        default:
          campoValido = false;
      }
    } while (campoValido !== true);
  }

  compraFinalizada() {
    alert(
      `Su compra son los siguientes productos: ${this.ordenarProductosPorPrecio()} \n La suma total es de: $${
        this.subTotal
      }. \n Sumando el envio y la forma de pago, hace un total de: $${
        this.formaDePago
      }`
    );
  }

  ordenarProductosPorPrecio() {
    let porductosOrdenados = [...this.producto];
    porductosOrdenados.sort((a, b) => a.precio - b.precio);

    let respuestaCliente = "";
    for (let i = 0; i < porductosOrdenados.length; i++) {
      respuestaCliente = respuestaCliente.concat(
        ` \n ${porductosOrdenados[i].nombre} precio: $${porductosOrdenados[i].precio} - Cantidad seleccionada: ${porductosOrdenados[i].cantidad} `
      );
    }
    return respuestaCliente;
  }

  calcularCostoTotal() {
    this.calcularSubTotal();
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
  const idProductoSeleccionado = parseInt(
    productoAgregado.querySelector("a").getAttribute("data-id")
  );

  let datoProductos = {};

  productosEnStock.forEach((producto) => {
    if (producto.id === idProductoSeleccionado) {
      datoProductos = { ...producto };
      datoProductos.cantidad = 1;
    }
  });
  const existe = coleccionProductos.some(
    (producto) => producto.id === datoProductos.id
  );

  if (existe) {
    //actualizamos la cantidad
    const productosListaSinCopia = coleccionProductos.map((producto) => {
      if (producto.id === datoProductos.id) {
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

  let carrito = new Carrito(coleccionProductos);
  carrito.calcularCostoTotal();
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

// FUNCION CALCULA FORMA DE ENVIO, CALCULANDO EL COSTO A LA API DE ANDREANI
async function calcularEnvio(e) {
  e.preventDefault;

  let cp = document.querySelector("#codigo-postal").value;
  if (cp !== "") {
    let url = `https://apis.andreani.com/v1/tarifas?cpDestino=${cp}&contrato=300006611&bultos[0][valorDeclarado]=1`;

    let response = await fetch(url);
    const precio = await response.json();
    let precioEnvio = await precio.tarifaConIva.total;
    const costoEnvioHTML = document.querySelector("#costoEnvio");
    costoEnvioHTML.innerText = `${precioEnvio}`;
  } else {
    alert("Ingrese un codigo postal");
  }
}

// ADDEVENTLISTENER
btnAgregarCarrito.addEventListener("click", productoSeleccionado);
btnVaciarCarrito.addEventListener("click", () => {
  // eliminamos todo el HTML
  limpiarHTML();
});
btnCalcularEnvio.addEventListener("click", calcularEnvio);
