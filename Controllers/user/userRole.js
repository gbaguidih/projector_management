const express = require("express");
const db = require("../../config/db");
const router = express.Router();
const verifyRole = require("../../Middleware/role");

// Route accessible seulement aux administrateurs
router.get('/admin', verifyRole(['admin']), (req, res) => {
    res.json({ message: "Bienvenue sur la page admin" });
});

// Route accessible aux enseignants et aux admins
router.get('/enseignants', verifyRole(['enseignant', 'admin']), (req, res) => {
    res.json({ message: "Bienvenue enseignant" });
});

// Route pour les étudiants
router.get('/etudiants', verifyRole(['etudiant', 'admin']), (req, res) => {
    res.json({ message: "Bienvenue étudiant" });
});

module.exports = router;
