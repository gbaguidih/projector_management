const express = require("express");
const db = require("../config/db");
const createTable = require("../config/createTable");
const router = express.Router(); // router Express

// Importer les routes register et login
const register = require("../Controllers/user/register");
const login = require("../Controllers/user/login");


// Route d'accueil
router.get("/", (req, res) => {
    res.send("Bienvenue sur l'application de gestion de projecteurs");
  });

//Middleware
const verifyToken = require("../Middleware/auth");

  
// Utiliser les routes d'authentification
router.use('/', register);
router.use('/', login);

// Route protégée pour le profile 
router.get('/profile', verifyToken, (req, res) => {
  res.status(200).send(`Bonjour ${req.userId}`);
});
module.exports = router;
