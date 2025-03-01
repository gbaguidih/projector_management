const express = require("express");
const db = require("../config/db");
const createTable = require("../config/createTable");
const router = express.Router();

// Importer la route projecteur
const projecteur = require("../Controllers/projecteur/projecteurController");

// Utiliser la route  
router.use('/',projecteur);

module.exports = router;
