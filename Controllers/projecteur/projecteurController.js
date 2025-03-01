const express = require("express");
const db = require("../../config/db");
const router = express.Router();

// Trouver tous les projecteurs
router.get('/projecteur', (req, res) => {
  db.all("SELECT * FROM projecteurs", (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(200).json(rows);
    }
  });
});

// Créer un projecteur
router.post('/projecteur', (req, res) => {
  const { nom, cables, status } = req.body;
  db.run( `INSERT INTO projecteurs (nom, cables, status) VALUES (?, ?, ?)`, [nom, cables, status], function (err) {
    if (err) {
      res.status(400).json({ error: err.message });
    } else {
      res.status(201).json({ id: this.lastID, message: "Projecteur créé !" });
    }
  });
});

// Trouver un projecteur par ID
router.get('/projecteur/:id', (req, res) => {
  const { id } = req.params;
  db.get("SELECT * FROM projecteurs WHERE id_projecteur = ?", [id], (err, row) => {
    if (err) {
      res.status(400).json({ error: err.message });
    } else if (row) {
      res.status(200).json(row);
    } else {
      res.status(404).json({ message: "Projecteur non trouvé" });
    }
  });
});

// Mettre à jour un projecteur
router.put('/projecteur/:id', (req, res) => {
  const { id } = req.params;
  const { nom, cables, status } = req.body;
  db.run( `UPDATE projecteurs SET nom = ?, cables = ?, status = ? WHERE id_projecteur = ?`, [nom, cables, status, id], function (err) {
    if (err) {
      res.status(400).json({ error: err.message });
    } else {
      res.status(200).json({ message: "Projecteur mis à jour !" });
    }
  });
});

// Supprimer un projecteur
router.delete('/projecteur/:id', (req, res) => {
  const { id } = req.params;
  db.run( `DELETE FROM projecteurs WHERE id_projecteur = ?`, [id], function (err) {
    if (err) {
      res.status(400).json({ error: err.message });
    } else {
      res.status(200).json({ message: "Projecteur supprimé !" });
    }
  });
});

module.exports = router;
