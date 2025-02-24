// Importaton de sqlite3
const sqlite3 = require("sqlite3").verbose();

// Création et connection à de la base de données SQLite3
const db = new sqlite3.Database(
  "database.sqlite", //nom de la base de donnée
  sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
  (err) => {
    if (err) {
      console.error("Erreur lors de la connection à la base de donnée", err);
    } else {
      console.log("Connecté à la base de données SQLite avec succès.");
    }
  }
);

module.exports = db
