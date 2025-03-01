//Importation de la logique de création de la base de donnée db
const db = require("./db")

// Création des tables
db.serialize(() => {
    
    // Table des utilisateurs
    db.run(
        `    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        role TEXT CHECK(role IN ('student', 'teacher', 'admin')) NOT NULL
    )`, 
        (err) => {
            if (err){
                console.log(err.message);
            } else {
                console.log('La table user est créer !!! ');
            }   
        }
    );

    // Table des projecteurs
    db.run(
        ` CREATE TABLE IF NOT EXISTS projectors (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        status TEXT CHECK(status IN ('working', 'broken')) NOT NULL DEFAULT 'working',
        available INTEGER NOT NULL DEFAULT 1
    )`, 
        (err) => {
            if (err){
                console.log(err.message);
            } else {
                console.log('La table projectors est créer !!! ');
            }   
        }
    );

    // Table des reservations
    db.run(
        `
    CREATE TABLE IF NOT EXISTS reservations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        projector_id INTEGER NOT NULL,
        datetime TEXT NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (projector_id) REFERENCES projectors(id) ON DELETE CASCADE
    )`, 
        (err) => {
            if (err){
                console.log(err.message);
            } else {
                console.log('La table reservations est créer !!! ');
            }   
        }
    );
});

// Définir la fonction closeDatabase qui permet de fermet la base de donnée lorsqu'on coupe l'application
const closeDatabase = () => {
    db.close((err) => {
      if (err) {
        console.error(err.message);
      } else {
        console.log('Fermeture de la base de données.');
      }
    });
  };
  

module.exports = closeDatabase;
