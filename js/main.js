// Variables
const btnAgregarCarrito = document.getElementById("lista-productos");
const spanSubTotal = document.getElementById("sub-total");
const btnVaciarCarrito = document.getElementById("vaciar-carrito");
const contenedorCarrito = document.querySelector("#lista-carrito tbody");
const btnCalcularEnvio = document.querySelector("#calcular-envio");
const spanTotal = document.querySelector("#total");
let coleccionProductos = [];
let subTotal = 0;
let total = 0;


//FUNCIONES
    // JQUERY
  // Muestra la cantidad de productos seleccionados en el carrito
  function mostrarCantidadCarrito(){
    if (coleccionProductos.length !== 0) {
      let cantidadProductoCarrito= 0; 
      for (let producto of coleccionProductos) {
          cantidadProductoCarrito += parseInt(producto.cantidad); 
      }
      $('#carrito .badge').text(cantidadProductoCarrito);
      $('#carrito .badge').show();
    } else {
      $('#carrito .badge').hide();
    }
  }
  // Elimina un curso del carrito

  $('#lista-carrito').on('click',(e)=>{
    e.preventDefault();
    if (e.target.classList.contains("borrar-curso")) {
      // console.log(e.target.getAttribute("data-id"));
      const productoId =parseInt(e.target.getAttribute("data-id"));
      // Filtro todos los productos que sean distintos al producto con id que fue seleccionado
    coleccionProductos = coleccionProductos.filter((prodcuto) => prodcuto.id !== productoId);
      carritoHTML();
      }

  });


// VANILLLA JS

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

  carritoHTML();
}

// Funcion para guardar en local storage
function sincronizarLocalSotorage() {
  localStorage.setItem("carrito", JSON.stringify(coleccionProductos));
}

// FUNCION QUE PINTA LO QUE TENEMOS EN EL ARRAY DE PRODUCTOS Y LOS PINTA EN EL HTML
function carritoHTML() {
  // // limpiar el html
  limpiarHTML();
  //recorre el carrito y genera el html
  coleccionProductos.forEach((producto) => {
    const { imagen, nombre, precio, cantidad,id } = producto;
    const row = document.createElement("tr");
    row.innerHTML = `
      <td><img src='${imagen}' width='100'></td>
      <td>${nombre}</td>
      <td>$${precio}</td>
      <td>${cantidad}</td>
      <td><a href="#" class="borrar-curso" data-id=${id}>X</a></td>
    `;
    contenedorCarrito.appendChild(row);
  });

  // Agrego el carrito de comprasal local stogare
  sincronizarLocalSotorage();
  mostrarCantidadCarrito();
  calcularSubTotal();
}


// CALCULA EL SUBTOTAL DE LA CANTIDAD DE PRODUCTOS SELECCIONADOS * EL PRECIO
function calcularSubTotal() {
  subTotal = 0;
  if (coleccionProductos.length !== 0) {
    for (let producto of coleccionProductos) {
      subTotal += parseInt(producto.precio) * parseInt(producto.cantidad);
  
    }
  } else {
    subTotal = 0;
  }
  total = subTotal;
  spanTotal.innerText = total;
  spanSubTotal.innerText = subTotal;
}

// FUNCION QUE QUITA ELEMENTO DEL HTML
// Limpiar storage
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
    total+=parseInt(precioEnvio);
    spanTotal.innerText = total;
  } else {
    alert("Ingrese un codigo postal");
  }
}

// ADDEVENTLISTENER


btnAgregarCarrito.addEventListener("click", productoSeleccionado);
btnVaciarCarrito.addEventListener("click", () => {
  // eliminamos todo el HTML
  limpiarHTML();
  coleccionProductos = [];
  localStorage.clear();
  calcularSubTotal();
});
btnCalcularEnvio.addEventListener("click", calcularEnvio);
document.addEventListener("DOMContentLoaded", () => {
  coleccionProductos = JSON.parse(localStorage.getItem("carrito")) || [];
  carritoHTML();
});

 // Muestra el carrito
 $("#carrito").on("click", (e) => {
 e.preventDefault(); 
 $(".carrito-compras").animate({width:'toggle'},350)});
 
 // Oculta el carrito 
 $("#btn-cerrar-carrito").on("click", (e) => {
  e.preventDefault(); 
  $(".carrito-compras").animate({width:'toggle'},350)

});

// TO DO ornar el los productos por precio en el HTML
//   ordenarProductosPorPrecio() {
//     let porductosOrdenados = [...this.producto];
//     porductosOrdenados.sort((a, b) => a.precio - b.precio);

//     let respuestaCliente = "";
//     for (let i = 0; i < porductosOrdenados.length; i++) {
//       respuestaCliente = respuestaCliente.concat(
//         ` \n ${porductosOrdenados[i].nombre} precio: $${porductosOrdenados[i].precio} - Cantidad seleccionada: ${porductosOrdenados[i].cantidad} `
//       );
//     }
//     return respuestaCliente;
//   }
