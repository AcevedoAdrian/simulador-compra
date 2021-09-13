const listaProdcutos = document.querySelector('#lista-productos .row');

function cargarProductos(){
  productosEnStock.forEach(producto => {
    let productoHtml = document.createElement("div");
    productoHtml.className="col mb-3";
    productoHtml.innerHTML = `
            <div class="card h-100 text-center">
              <img src="${producto.imagen}" class="card-img-top producto-img" alt="..." height='400px'>
              <div class="card-body">
            <p class="producto-titulo"> ${producto.nombre}</p>
                <p class="producto-precio">$${producto.precio}</p>
                <a href="#" data-id="${producto.id}" class="btn btn-primary btnAgregarCarrito">Añadir al carrito</a>
              </div>
            </div>
    `
    listaProdcutos.appendChild(productoHtml);
})

}
cargarProductos();