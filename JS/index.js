/*
import * as utilities from './utilities.js';
import * as indexDBStatic from './indexDBStatic.js'

indexDBStatic.indexDBProvinceExists().then(result => console.log(result));

utilities.getInfoFromClient().then(data=>console.log(data))
*/

Array.from(document.querySelectorAll(".provincia")).forEach((e) => {
  e.addEventListener("click", () => {
    window.location.href = `./PAGES/municipios.html?id=${e.id}`;
  });
});


fetch("../JSON/provincias.json")
  .then(response => response.json())
  .then(provincias => {
    const searchInput = document.getElementById("buscador");
    const opciones = document.getElementById("opciones");
    const buscarLupa = document.getElementById("buscarLupa");

    opciones.innerHTML = ``;
    let codigoSeleccionado; 

    searchInput.addEventListener("input", () => {
      const searchTerm = searchInput.value.trim().toLowerCase();

      const results = Object.entries(provincias).filter(([provinciaNombre]) =>
        provinciaNombre.toLowerCase().includes(searchTerm)
      );
      
      opciones.innerHTML = ``;

      if (searchInput.value == ``) {
        opciones.innerHTML = ``;
      } else {
        results.forEach(([provinciaNombre, codigo]) => {
          opciones.innerHTML += `<p>${provinciaNombre}</p>`; // cambia aquí como quieres que salgan las opciones en el buscador 
          if(results.length===1){
            codigoSeleccionado = codigo;
          }
        });
      }
    });

    buscarLupa.addEventListener("click", () => {
      if(codigoSeleccionado != null){
        window.location.href = `./PAGES/municipios.html?id=${codigoSeleccionado}`;
      } 
    });
  });





