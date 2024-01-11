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
    let codigoSeleccionado; // Variable para almacenar el código postal seleccionado

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
          opciones.innerHTML += `<p>${provinciaNombre} con código ${codigo}</p>`;
          // Almacenar el código postal en la variable al hacer clic en una opción
          opciones.lastChild.addEventListener("click", () => {
            codigoSeleccionado = codigo;
          });
        });
      }
    });

    buscarLupa.addEventListener("click", () => {
      // Redirigir a la página de municipios con el código postal seleccionado
      if (codigoSeleccionado) {
        window.location.href = `./PAGES/municipios.html?id=${codigoSeleccionado}`;
      }
    });
  });





