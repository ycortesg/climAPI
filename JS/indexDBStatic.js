const INDEXDB_NAME = "staticDB";
const INDEXDB_VERSION = 1;
const STORE_NAME = "staticStore";

function openDB() {
  // Promesa para manejar operaciones asíncronas
  return new Promise((resolve, reject) => {
    // Solicitud para abrir la base de datos
    let request = indexedDB.open(INDEXDB_NAME, INDEXDB_VERSION);

    // Evento que indica que la base de datos está lista.
    request.onsuccess = (event) => {
      // Referencia a la BD
      db = event.target.result;
      // Indica que la promesa se completó con éxito
      resolve();
    };

    // Evento que indica que apertura ha fallado.
    request.onerror = (event) => {
      // Indica que la promesa falló
      reject(event.target.error);
    };

    // Evento que se activa cuando la versión cambia o se crea por primera vez
    request.onupgradeneeded = (event) => {
      db = event.target.result;

      if (!db.objectStoreNames.contains(STORE_NAME)) {
        // Crea un almacen de objetos (tabla), campo id como clave primaria y autoincremental
        let objectStore = db.createObjectStore(STORE_NAME, {
          keyPath: "id",
          autoIncrement: true,
        });
        objectStore.createIndex("province", "province", { unique: true });
      }
    };
  });
}

function getPriovinceDB(key) {
  return new Promise((resolve, reject) => {
    // variables de indexDB
    let transaction = db.transaction([STORE_NAME], "readwrite");
    let objectStore = transaction.objectStore(STORE_NAME);

    // accionar get
    let request = objectStore.get(key);

    // retorna el retultado de get
    request.onsuccess = (event) => {
      resolve(request.result);
    };

    // retorna el error
    request.onerror = (event) => {
      reject(event.target.error);
    };
  });
}

function addProvinceDB(data) {
  openDB().then(() => {
    return new Promise((resolve, reject) => {
      // variables de indexDB
      let transaction = db.transaction([STORE_NAME], "readwrite");
      let objectStore = transaction.objectStore(STORE_NAME);

      // accionar get
      let request = objectStore.add(data);

      // resuelve add
      request.onsuccess = (event) => {
        resolve();
      };

      // devuelve error
      request.onerror = (event) => {
        reject(event.target.error);
      };
    });
  });
}

function updateDB(key, provinceContent) {
  openDB().then(() => {
    return new Promise((resolve, reject) => {
      // variables de indexDB
      let transaction = db.transaction([STORE_NAME], "readwrite");
      let objectStore = transaction.objectStore(STORE_NAME);

      // get para conseguir objeto por key
      let request = objectStore.get(key);

      // si request funciona
      request.onsuccess = () => {
        const provinceObj = request.result;

        // cambiamos el valor de la provincia a actualizar
        provinceObj.province = provinceContent;

        // actualizamos el objeto
        const updateRequest = objectStore.put(provinceObj);

        // si no hay fallo se muestra mensaje en consola indicandolo
        updateRequest.onsuccess = () => {
          console.log(`Province updated : ${updateRequest.result}`);
        };
      };

      // si hay algun error
      request.onerror = (event) => {
        reject(event.target.error);
      };
      db.close();
    });
  });
}

function getAllDB() {
    return new Promise((resolve, reject) => {
      // variables de indexDB
      let transaction = db.transaction([STORE_NAME], "readwrite");
      let objectStore = transaction.objectStore(STORE_NAME);
  
      // accionar getAll
      let request = objectStore.getAll();
  
      // si request funciona devuelve lista con todos los objetos
      request.onsuccess = (event) => {
        console.log(request.result);
        resolve(request.result);
      };
  
      // si request falla manda error
      request.onerror = (event) => {
        reject(event.target.error);
      };
    });
  }