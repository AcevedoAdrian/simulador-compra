// Variables
const btnAgregarCarrito = document.getElementById("lista-productos");
const spanSubTotal = document.getElementById("sub-total");
const btnVaciarCarrito = document.getElementById("vaciar-carrito");
const contenedorCarrito = document.querySelector("#lista-carrito tbody");
const btnCalcularEnvio = document.querySelector("#calcular-envio");
const spanTotal = document.querySelector("#total");
const msgError = document.querySelector('#msg-error');
let coleccionProductos = [];
let subTotal = 0;
let total = 0;
let precioEnvioGlobal= 0


//FUNCIONES

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
    const { imagen, nombre, precio, cantidad, id } = producto;
    const row = document.createElement("tr");
    row.innerHTML = `
      <td><img src='${imagen}' width='40'></td>
      <td>${nombre}</td>
      <td>${cantidad}</td>
      <td>$${precio}</td>
      <td><a href="#" class="borrar" data-id=${id}><ion-icon name="trash-outline" size="large"></ion-icon></a></td>
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
  total = subTotal + precioEnvioGlobal;
  
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
  const costoEnvioHTML = document.querySelector("#costoEnvio");
  let cp = document.querySelector("#codigo-postal").value;
  let precioEnvio = 0;
  if (cp !== "") {
     if(msgError.classList.contains( 'msg-visible' )){
      msgError.classList.add("msg-oculto")     
      msgError.classList.remove("msg-visible");
     }
    costoEnvioHTML.value = 0;
    let url = `https://apis.andreani.com/v1/tarifas?cpDestino=${cp}&contrato=300006611&bultos[0][valorDeclarado]=1`;

    let response = await fetch(url);
    if (response.status === 200) {
      const precio = await response.json();
      precioEnvio =  parseInt(precio.tarifaConIva.total);      
      

    } else {
      msgError.classList.remove("msg-oculto")     
      msgError.textContent= 'No se encontro codigo postal';
      msgError.classList.add("msg-visible");
    }
  } else {
    msgError.classList.remove("msg-oculto")    
    msgError.textContent ='Ingrese un codigo postal';
    msgError.classList.add("msg-visible");
  }
      costoEnvioHTML.innerText = `$${precioEnvio}`;
      precioEnvioGlobal = precioEnvio;
      calcularSubTotal();
      // total += precioEnvio;
      spanTotal.innerText = total;
}

// ADDEVENTLISTENER

btnAgregarCarrito.addEventListener("click", productoSeleccionado);
btnVaciarCarrito.addEventListener("click", () => {
  // eliminamos todo el HTML
  limpiarHTML();
  coleccionProductos = [];
  localStorage.clear();
  calcularSubTotal();
  mostrarCantidadCarrito();
});
btnCalcularEnvio.addEventListener("click", calcularEnvio);
document.addEventListener("DOMContentLoaded", () => {
  coleccionProductos = JSON.parse(localStorage.getItem("carrito")) || [];
  carritoHTML();
});

// JQUERY
// Muestra la cantidad de productos seleccionados en el carrito
function mostrarCantidadCarrito() {
  if (coleccionProductos.length !== 0) {
    let cantidadProductoCarrito = 0;
    for (let producto of coleccionProductos) {
      cantidadProductoCarrito += parseInt(producto.cantidad);
    }
    $("#carrito .badge").text(cantidadProductoCarrito);
    $("#carrito .badge").show();
  } else {
    $("#carrito .badge").hide();
  }
}

// Elimina un producto del carrito
$("#lista-carrito").on("click", (e) => {
  e.preventDefault();
  if (e.target.name === "trash-outline") {
    // console.log(e.target.getAttribute("data-id"));
    const productoId = parseInt(e.target.parentElement.getAttribute("data-id"));
    // Filtro todos los productos que sean distintos al producto con id que fue seleccionado
    coleccionProductos = coleccionProductos.filter(
      (prodcuto) => prodcuto.id !== productoId
    );
    carritoHTML();
  }
});

// Muestra el carrito
$("#carrito").on("click", (e) => {
  e.preventDefault();
  $(".carrito-compras").animate({ width: "toggle" }, 350);
});

// Oculta el carrito
$("#btn-cerrar-carrito").on("click", (e) => {
  e.preventDefault();
  $(".carrito-compras").animate({ width: "toggle" }, 350);
});

