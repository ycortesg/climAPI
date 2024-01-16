const URLMunicipios = `https://www.el-tiempo.net/api/json/v2/provincias/`; // hay que añadir el CODPROV de la provincia seleccionada en el mapa
const finalURLMunicipios = `/municipios`; // se le añade al final de la url municipios una vez se tenga el CODPROV

import * as indexDBStatic from "./indexDBStatic.js";
import * as indexDBFav from "./indexDBFav.js";

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
  await indexDBFav.openDB();
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

    informacion = { id: idProv, value: informacion };
  }

  informacion.value.arrayObjMunicipio.sort((a, b) => a.nombreMun.localeCompare(b.nombreMun));

  let grupos = informacion.value.arrayObjMunicipio.reduce((grupos, municipio) => {
    let letra = municipio.nombreMun[0].toUpperCase();
    if (!grupos[letra]) {
      grupos[letra] = [];
    }
    grupos[letra].push(municipio);
    return grupos;
  }, {});

  titulo.innerHTML = `${informacion.value.nombre}`;


  for (let letra in grupos) {
    let divLetra = document.createElement("div");
    divLetra.innerHTML = `<h2>${letra}</h2>`;
    contenedor.appendChild(divLetra);

    grupos[letra].forEach((elemento) => {
      let div = document.createElement("div");
      div.id = elemento.IDMun;
      div.classList.add("col-12", "col-sm-6", "col-md-4", "col-lg-3", "bg-white", "text-dark", "card");
      div.innerHTML = `<div class="card-body" id="municipiosCarta">
            <h5 class="card-title text-center ">${elemento.nombreMun}</h5>
            <button id="favorito" class="bg-info">Fav</button>
            <button id="detalles">Detalles</button>
        </div>`;
      contenedor.appendChild(div);
      generarEventoLink(div.querySelector("button#detalles"), elemento.IDMun);
      generarFavoritoEvento(div.querySelector("button#favorito"), elemento);
      indexDBFav.getTownDB(elemento.IDMun)
      .then((e)=>{
        if (e){
          div.querySelector("button#favorito").classList.remove("bg-info")
          div.querySelector("button#favorito").classList.add("bg-danger")
        }
      })
    });
  }
}

indexDBInicicial().then(() => {
});

function generarEventoLink(divElement, IDMun) {
  divElement.addEventListener("click", () => {
    window.location.href = `../PAGES/municipioDetalles.html?id=${IDMun}`;
  });
}
function generarFavoritoEvento(element, Mun){
  element.addEventListener("click", () =>{
    if (element.classList.contains("bg-info")){
      element.classList.remove("bg-info")
      element.classList.add("bg-danger")
      indexDBFav.addTownDB(Mun, Mun.IDMun);
    }else{
      element.classList.add("bg-info")
      element.classList.remove("bg-danger")
      indexDBFav.deleteTownDB(Mun.IDMun);
    }
  })
}