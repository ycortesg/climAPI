/*
import * as utilities from './utilities.js';
import * as indexDBStatic from './indexDBStatic.js'

indexDBStatic.indexDBProvinceExists().then(result => console.log(result));

utilities.getInfoFromClient().then(data=>console.log(data))
*/

const URLMunicipios = `https://www.el-tiempo.net/api/json/v2/provincias/`; // hay que añadir el CODPROV de la provincia seleccionada en el mapa
const finalURLMunicipios = `/municipios`; // se le añade al final de la url municipios una vez se tenga el CODPROV
const masInfoURL = `https://www.el-tiempo.net/api/json/v2/provincias/06/municipios/06083` // mas info merida

let informacion = {};

let arrayObjMunicipio = [];

let URLFinal = `${URLMunicipios}06${finalURLMunicipios}`;

fetch(URLFinal)
    .then(response => response.json())
    .then(datosProv => {
        console.log(datosProv);

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
        console.log(informacion)
    })
    .catch(error => {
        console.error("Error en la solicitud:", error);
    });





