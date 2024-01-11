const URLMunicipios = `https://www.el-tiempo.net/api/json/v2/provincias/`; // hay que añadir el CODPROV de la provincia seleccionada en el mapa
const finalURLMunicipios = `/municipios`; // se le añade al final de la url municipios una vez se tenga el CODPROV

var parametros = new URLSearchParams(window.location.search);
var idProvinciaURL = parametros.get(`id`);

const titulo = document.getElementById("titulo");
const lista = document.getElementById("lista");


let informacion = {};
let arrayObjMunicipio = [];

let URLFinal = `${URLMunicipios}${idProvinciaURL}${finalURLMunicipios}`; 

fetch(URLFinal)
    .then(response => response.json())
    .then(datosProv => {

        const nombre = datosProv.provincia;
        const idProv = datosProv.codprov;

        informacion.nombre = nombre;
        informacion.idProv = idProv;

        datosProv.municipios.forEach(elemento => {
            let nombreMunicipio = elemento.NOMBRE;
            let IDMunicioio = elemento.CODIGOINE.substr(0, 5)
            let poblacionMunicipio = elemento.POBLACION_MUNI;
           
            let obj = { "nombreMun": nombreMunicipio, "IDMun": IDMunicioio, "poblacionMun": poblacionMunicipio};
            arrayObjMunicipio.push(obj);
        });
        informacion.arrayObjMunicipio = arrayObjMunicipio;

       
        titulo.innerHTML = `${informacion.nombre}`;
        informacion.arrayObjMunicipio.forEach(elemento => {
    
        lista.innerHTML += `<li>${elemento.nombreMun}</li>`
    });

    })
    .catch(error => {
        console.error("Error en la solicitud:", error);
    });



