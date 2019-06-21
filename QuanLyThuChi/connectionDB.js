import { Platform } from "react-native";
let SQLite = require("react-native-sqlite-storage");
let db;
function errorCB(err) {
  console.log("SQL Error: " + err);
}

function successCB() {
  console.log("SQL executed fine");
}

function openCB() {
  console.log("Database OPENED");
}
if (Platform.OS === "ios")
  db = SQLite.openDatabase(
    {
      name: "_myDB.db",
      createFromLocation: "~www/myDB.db",
      location: "Library"
    },
    openCB,
    errorCB
  );
else
  db = SQLite.openDatabase(
    {
      name: "_myDB.db",
      createFromLocation: "~myDB.db"
    },
    openCB,
    errorCB
  );

export default db;
/// fỏ mat lai ban
// format nè forr mat coi gi ?
// ne
// ham gì ?
// vo 1 trang di mình ví dụ 1 trang
// ne ban chi can save la format do, gay
