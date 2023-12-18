// import * as utilities from './utilities.js';
import * as indexDBStatic from './indexDBStatic.js'

indexDBStatic.indexDBProvinceExists().then(result => console.log(result));

// utilities.getInfoFromClient().then(data=>console.log(data))