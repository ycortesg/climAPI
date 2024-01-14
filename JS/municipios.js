const URLMunicipios = `https://www.el-tiempo.net/api/json/v2/provincias/`; // hay que añadir el CODPROV de la provincia seleccionada en el mapa
const finalURLMunicipios = `/municipios`; // se le añade al final de la url municipios una vez se tenga el CODPROV

import * as indexDBStatic from "./indexDBStatic.js";

var parametros = new URLSearchParams(window.location.search);
var idProvinciaURL = parametros.get(`id`);

const titulo = document.getElementById("titulo");
const lista = document.getElementById("lista");
const contenedor = document.getElementById("contenedor"); 

let informacion;
let arrayObjMunicipio = [];

let URLFinal = `${URLMunicipios}${idProvinciaURL}${finalURLMunicipios}`

async function indexDBInicicial() {
  await indexDBStatic.openDB();
  informacion = await indexDBStatic.getPriovinceDB(idProvinciaURL);

  if (informacion === undefined) {
    informacion = {};
    console.log(1)
    let response = await fetch(URLFinal);
    let datosProv = await response.json();
    console.log(datosProv)

    const nombre = datosProv.provincia;
    const idProv = datosProv.codprov;

    informacion.nombre = nombre;

    datosProv.municipios.forEach((elemento) => {
      let nombreMunicipio = elemento.NOMBRE;
      let IDMunicioio = elemento.CODIGOINE.substr(0, 5);
      let poblacionMunicipio = elemento.POBLACION_MUNI;

      let obj = {
        nombreMun: nombreMunicipio,
        IDMun: IDMunicioio,
        poblacionMun: poblacionMunicipio,
      };
      arrayObjMunicipio.push(obj);
    });
    informacion.arrayObjMunicipio = arrayObjMunicipio;
    await indexDBStatic.addProvinceDB(informacion, idProv);

    informacion = {id: idProv, value: informacion};
  }
  titulo.innerHTML = `${informacion.value.nombre}`;
  informacion.value.arrayObjMunicipio.forEach((elemento) => {
    //dibujitos aqui
    let div = document.createElement("div");
    div.id = elemento.IDMun;
    div.classList.add("col-8","col-sm-6","col-md-4","col-lg-3","col-xl-2","bg-white","text-dark","card");
    div.innerHTML +=`<div class="card-body" id="municipiosCarta">
          <h5 class="card-title text-center ">${elemento.nombreMun}</h5>
      </div>`; 
      contenedor.appendChild(div);
      generarEventoLink(div,elemento.IDMun);
    //lista.innerHTML += `<li>${elemento.nombreMun}</li>`;
  });

}

indexDBInicicial().then(() => {
});


function generarEventoLink(divElement,IDMun){
divElement.addEventListener("click", () =>{
window.location.href = `../PAGES/municipioDetalles.html?id=${IDMun}`;
});
}