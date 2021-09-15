$(function () {
  $.ajax({
    url: "https://randomuser.me/api/?page=10&results=6&seed=abc",
    dataType: "json",
    success: function (data) {
      let usuarios = data.results;
      for (const usuario of usuarios) {
        $("#lista-usuarios .row").append(`
        <div class="col mb-4  pt-5">
        <div class="card  ">
          <img src="${usuario.picture.large}" class="mx-auto d-block rounded-circle" alt="...">
          <div class="card-body">
            <h5 class="card-title">${usuario.name.first}, ${usuario.name.last }</h5>
            <p class="card-text">${usuario.cell}</p>
            <p class="card-text">${usuario.email}</p>
          </div>
        </div>
        
        `);
      }
    }
  });

 
});
