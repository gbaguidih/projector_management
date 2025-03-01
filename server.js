const express = require("express");
const db = require("./config/db");
const createTable = require("./config/createTable");
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Importation des routes
const auth = require("./Route/authRoute"); 
const projecteur = require("./Route/projecteurRoute");
const reservation = require("./Route/reservationRoute");
const role = require("./Route/roleRoute"); 

const app = express();

app.use(bodyParser.json());

// Utilisation des routes centralisée
app.use('/', auth);
app.use('/', projecteur);
app.use('/', reservation);
app.use('/', role);

app.listen(3000, () => {
  console.log("Serveur démarré (http://localhost:3000)!");
});


// Fermerture de la base de données lors de l'arrêt de l'application
process.on('SIGINT', () => {
    createTable.closeDatabase();
    process.exit();
  });