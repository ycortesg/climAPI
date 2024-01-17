import * as indexDBFav from "./indexDBFav.js";

indexDBFav.openDB().then(() => {

  indexDBFav.getAllDB().then(e => {
    e.forEach((el) => {
      let elemento = el.value;
      let div = document.createElement("div");
      div.id = elemento.IDMun;
      div.classList.add("col-12", "col-sm-6", "col-md-4", "col-lg-3", "bg-white", "text-dark", "card");
      div.style.height = '110px';
      div.innerHTML = `<div class="card-body text-center " id="municipiosCarta">
          <h5 class="card-title ">${elemento.nombreMun}</h5>
          <button id="detalles" class="btn btn-info">Detalles</button>
          <button id="eliminar" class="btn btn-danger">Eliminar</button>
        </div>`;
      let favoritos = document.getElementById(`favoritos`);
      favoritos.appendChild(div);
      generarEventoLink(div.querySelector("button#detalles"), elemento.IDMun);
      generarEliminarEvento(div, elemento.IDMun, div.querySelector("button#eliminar"))
    })
  })
})

function generarEventoLink(divElement, IDMun) {
  divElement.addEventListener("click", () => {
    window.location.href = `../PAGES/municipioDetalles.html?id=${IDMun}`;
  });
}
function generarEliminarEvento(element, IDMun, boton) {
  boton.addEventListener("click", () => {
    element.remove()
    indexDBFav.deleteTownDB(IDMun);

  })
}