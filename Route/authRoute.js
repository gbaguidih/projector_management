const express = require("express");
const db = require("../config/db");
const createTable = require("../config/createTable");
const router = express.Router(); // router Express

// Importer de la route register 
const register = require("../Controllers/user/register");


// Route d'accueil
router.get("/", (req, res) => {
    res.send("Bienvenue sur l'application de gestion de projecteurs");
  });
  
// Utiliser la route d'authentification
router.use('/', register);

module.exports = router;
