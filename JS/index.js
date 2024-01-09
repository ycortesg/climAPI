/*
import * as utilities from './utilities.js';
import * as indexDBStatic from './indexDBStatic.js'

indexDBStatic.indexDBProvinceExists().then(result => console.log(result));

utilities.getInfoFromClient().then(data=>console.log(data))
*/

Array.from(document.querySelectorAll(".provincias")).forEach((e)=>{
    e.addEventListener("click", ()=>{
      window.location.href = `./PAGES/municipios.html?id=${e.id}`;
    });
  });





