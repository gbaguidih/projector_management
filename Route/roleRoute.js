const express = require("express");
const db = require("../config/db");
const createTable = require("../config/createTable");
const router = express.Router(); // Créer un router Express

// Importer les routes register et login
const role = require("../Controllers/user/userRole");

// Utiliser les routes role
router.use('/',role);
  //Middleware
const verifyRole = require("../Middleware/role");

// Route protégée pour le profile 
router.get('/profile', verifyRole, (req, res) => {
    res.status(200).send(`Bonjour ${req.userId}`);
  });
module.exports = router;
