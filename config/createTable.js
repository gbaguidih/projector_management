//Importation de la logique de création de la base de donnée db
const db = require("./db")

// Création des tables
db.serialize(() => {
    
    // Table des utilisateurs
    db.run(
        `CREATE TABLE IF NOT EXISTS users (
        id_user INTEGER PRIMARY KEY AUTOINCREMENT,
        nom TEXT NOT NULL ,
        prenom TEXT NOT NULL ,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        role TEXT NOT NULL CHECK (role IN ('etudiant' , 'enseignant' , 'administrateur'))
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
        `CREATE TABLE IF NOT EXISTS projecteurs  (
        id_projecteur INTEGER PRIMARY KEY AUTOINCREMENT,
        nom TEXT NOT NULL,
        cables TEXT NOT NULL CHECK (cables IN ('HDMI' , 'VGA')),
        status TEXT NOT NULL CHECK (status IN ('Libre' , 'Occupe')) DEFAULT 'Libre'
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
        `CREATE TABLE IF NOT EXISTS reservations (
        id_reservation  INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        projecteur_id INTEGER NOT NULL,
        date_reservation DATE NOT NULL,
        start_time TEXT NOT NULL,
        end_time TEXT NOT NULL,
        FOREIGN KEY(user_id) REFERENCES users(id_user),
        FOREIGN KEY(projecteur_id) REFERENCES projecteurs(id_projecteur)
        UNIQUE(projecteur_id, date_reservation, start_time, end_time)
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
