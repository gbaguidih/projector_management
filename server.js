const express = require("express");
const db = require("./config/db");
const createTable = require("./config/createTable");
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Importation des routes
const auth = require("./Route/authRoute"); 

const app = express();

app.use(bodyParser.json());

// Utilisation de la routes centralisée
app.use('/', auth);

app.listen(3000, () => {
  console.log("Serveur démarré (http://localhost:3000)!");
});


// Fermerture de la base de données lors de l'arrêt de l'application
process.on('SIGINT', () => {
    createTable.closeDatabase();
    process.exit();
  });