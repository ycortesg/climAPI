let parametros = new URLSearchParams(window.location.search);
let idMunicipioURL = parametros.get(`id`);

let titulo = document.querySelector("h1#titulo");
let nombreProvincia = document.querySelector("h3#nombreProvincia");
let poblacionProvincia = document.querySelector("span#poblacionMunicipio");
let altitudMunicipio = document.querySelector("span#altitudMunicipio");
let estadoCieloMunicipio = document.querySelector("span#estadoCieloMunicipio");
let imagenEstadoMunicipioCielo = document.querySelector("img#estadoCielo");
let temperaturaActual = document.querySelector("span#temperaturaActual");

let temperaturaMin = document.querySelector("span#temperatura-min");
let temperaturaMax = document.querySelector("span#temperatura-max");

let humedadMunicipio = document.querySelector("span#humedadMunicipio");
let vientoMunicipio = document.querySelector("span#vientoMunicipio");
let precipitacionesMunicipio = document.querySelector("span#precipitacionesMunicipio");
let municipioLluvia = document.querySelector("span#municipioLluvia");
let hoyPronostico =  document.querySelector("div#hoy");
let mananaPronostico =  document.querySelector("div#manana");

let pronosticosDia0 = document.querySelector("div#p0");
let pronosticosDia1 = document.querySelector("div#p1");
let pronosticosDia2 = document.querySelector("div#p2");
let pronosticosDia3 = document.querySelector("div#p3");
let pronosticosDia4 = document.querySelector("div#p4");
let pronosticosDia5 = document.querySelector("div#p5");

const URLMunicipios = `https://www.el-tiempo.net/api/json/v2/provincias/${idMunicipioURL.substring(0,2)}/municipios/${idMunicipioURL}`;

function getSVG(idCielo){
    let diaNoche = idCielo.substring(0,1) === "n" ? "n" : "d";
    let idInt = diaNoche==="d" ? parseInt(idCielo) : parseInt(idCielo.substring(1, idCielo.length));
    let infoUrlIcon = idInt > 14 ? `4${idInt-14}0` : `${idInt-10}00`;
    return `https://statics.eltiempo.es/images/weather/svg/v1/32/${diaNoche}${infoUrlIcon}.svg`;
}

fetch(URLMunicipios)
  .then((response) => response.json())
  .then((data) => {
    titulo.innerText = data.municipio.NOMBRE;
    nombreProvincia.innerText = data.municipio.NOMBRE_PROVINCIA;
    poblacionProvincia.innerText = data.municipio.POBLACION_MUNI;
    altitudMunicipio.innerText = data.municipio.ALTITUD;
    estadoCieloMunicipio.innerText = data.stateSky.description;
    imagenEstadoMunicipioCielo.src = getSVG(data.stateSky.id);
    imagenEstadoMunicipioCielo.alt = data.municipio.NOMBRE;
    temperaturaActual.innerText = data.temperatura_actual;

    temperaturaMin.innerText = data.temperaturas.min;
    temperaturaMax.innerText = data.temperaturas.max;
    humedadMunicipio.innerText = data.humedad;
    vientoMunicipio.innerText = data.viento;
    precipitacionesMunicipio.innerText = data.precipitacion;
    municipioLluvia.innerText = data.lluvia;

    hoyPronostico.innerText = data.pronostico.hoy;
    mananaPronostico.innerText = data.pronostico.manana;

    pronosticosDia0.innerText = data.proximos_dias[0];
    pronosticosDia1.innerText = data.proximos_dias[1];
    pronosticosDia2.innerText = data.proximos_dias[2];
    pronosticosDia3.innerText = data.proximos_dias[3];
    pronosticosDia4.innerText = data.proximos_dias[4];
    pronosticosDia5.innerText = data.proximos_dias[5];
});