const express = require("express");
const db = require("../config/db");
const createTable = require("../config/createTable");
const router = express.Router();

// Importer la route projecteur
const reservation = require("../Controllers/reservation/reservationController");

// Utiliser la route  
router.use('/',reservation);

module.exports = router;
