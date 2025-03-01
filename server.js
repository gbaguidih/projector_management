const express = require("express");                      // Importation du server express
const bodyParser = require('body-parser');               // module pour accéder à la requete  
const db = require("./config/db");                       // Importation de la base de donnée
const createTable = require("./config/createTable");

const app = express();
app.use(bodyParser.json());

app.listen(3000, () => {
    console.log("Serveur démarré (http://localhost:3000)!");
  });


// Fermerture de la base de données lors de l'arrêt de l'application
process.on('SIGINT', () => {
    createTable.closeDatabase();
    process.exit();
});
  
