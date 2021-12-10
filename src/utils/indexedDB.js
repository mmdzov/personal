// const ConfigStoreInterface = {
//   keyPath: 'id',
//   autoIncrement: true,
// };

// // class Store {
// //   constructor(db) {
// //     this.db = db;
// //   }

// // }

// class IDB {
//   constructor(database = '', version = 1) {
//     this.request = indexedDB.open(database, version);

//     // this.request.onupgradeneeded = (event) => {
//     //   const db = this.request.result;
//     //   const store = new Store(db);
//     //   store.createStore('messages');
//     //   // if()
//     // };

//     this.request.onerror = () => {
//       console.error('Error', this.request.error);
//     };

//     this.request.onsuccess = () => {
//       let db = this.request.result;
//       // continue working with database using db object
//     };
//   }

//   createStore(store_name, config = ConfigStoreInterface) {
//     this.request.onupgradeneeded = () => {
//       const db = this.request.result;
//       db.transaction().
//       if (!db.objectStoreNames.contains(store_name)) {
//         db.createObjectStore(store_name, config);
//       }
//     };

//     this.db.createObjectStore(store_name, config);
//     return this;
//   }

//   transaction(store_name, type = 'readwrite') {
//     let transaction = this.db.transaction(store_name,type)
//     return transaction;
//   }
// }

// export default IDB;
