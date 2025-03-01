const express = require("express");
const db = require("../../config/db");
const router = express.Router();

// Trouver tous les reservations
router.get('/reservation', (req, res) => {
  db.all("SELECT * FROM reservations", (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(200).json(rows);
    }
  });
});

// Créer un reservations
router.post('/reservation', (req, res) => {
  const { user_id, projecteur_id, date_reservation, start_time, end_time } = req.body;
  db.run( `INSERT INTO reservations (user_id, projecteur_id, date_reservation, start_time, end_time) VALUES (?, ?, ?, ?, ?)`, [user_id, projecteur_id, date_reservation, start_time, end_time], function (err) {
    if (err) {
      res.status(400).json({ error: err.message });
    } else {
      res.status(201).json({ id: this.lastID, message: "Reservation créé !" });
    }
  });
});

// Trouver un reservations par ID
router.get('/reservation/:id', (req, res) => {
  const { id } = req.params;
  db.get("SELECT * FROM reservations WHERE id_reservation = ?", [id], (err, row) => {
    if (err) {
      res.status(400).json({ error: err.message });
    } else if (row) {
      res.status(200).json(row);
    } else {
      res.status(404).json({ message: "Reservation non trouvé" });
    }
  });
});

// Mettre à jour un reservations
router.put('/reservation/:id', (req, res) => {
  const { id } = req.params;
  const { user_id, projecteur_id, date_reservation, start_time, end_time } = req.body;
  db.run( `UPDATE reservations SET user_id = ?, projecteur_id = ?, date_reservation = ?, start_time = ?, end_time = ?  WHERE id_reservation = ?`, [user_id, projecteur_id, date_reservation, start_time, end_time, id], function (err) {
    if (err) {
      res.status(400).json({ error: err.message });
    } else {
      res.status(200).json({ message: "Reservation mis à jour !" });
    }
  });
});

// Supprimer un reservation
router.delete('/reservation/:id', (req, res) => {
  const { id } = req.params;
  db.run( `DELETE FROM reservations WHERE id_reservation = ?`, [id], function (err) {
    if (err) {
      res.status(400).json({ error: err.message });
    } else {
      res.status(200).json({ message: "Reservation supprimé !" });
    }
  });
});

module.exports = router;
