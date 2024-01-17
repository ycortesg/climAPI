const INDEXDB_NAME = "favProvinceDB";
const INDEXDB_VERSION = 1;
const STORE_NAME = "favProvinceStore";
let db;

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
          autoIncrement: false,
        });
        objectStore.createIndex("town", "town", { unique: true });
      }
    };
  });
}

function getTownDB(key) {
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

function addTownDB(data, idProv) {
  openDB().then(() => {
    return new Promise((resolve, reject) => {
      console.log(db);
      // variables de indexDB
      let transaction = db.transaction([STORE_NAME], "readwrite");
      let objectStore = transaction.objectStore(STORE_NAME);

      // accionar get
      let request = objectStore.put({ id: idProv, value: data });

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

function deleteTownDB(id) {
  openDB().then(() => {
    return new Promise((resolve, reject) => {
      // variables de indexDB
      let transaction = db.transaction([STORE_NAME], "readwrite");
      let objectStore = transaction.objectStore(STORE_NAME);

      // accionar get
      let request = objectStore.delete(id);

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

function getAllDB() {
  return new Promise((resolve, reject) => {
    // variables de indexDB
    let transaction = db.transaction([STORE_NAME], "readwrite");
    let objectStore = transaction.objectStore(STORE_NAME);

    // accionar getAll
    let request = objectStore.getAll();

    // si request funciona devuelve lista con todos los objetos
    request.onsuccess = (event) => {
      resolve(request.result);
    };

    // si request falla manda error
    request.onerror = (event) => {
      reject(event.target.error);
    };
  });
}

function indexDBTownExists() {
  return new Promise((resolve, reject) => {
    var request = indexedDB.open(INDEXDB_NAME);
    request.onupgradeneeded = (e) => {
      resolve(false);
    };
    request.onerror = (e) => {
      resolve(false);
    };
    request.onsuccess = (e) => {
      resolve(true);
    };
  });
}

export {
  openDB,
  getTownDB,
  addTownDB,
  deleteTownDB,
  getAllDB,
  indexDBTownExists,
};
