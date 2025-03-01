const db = require('../config/database'); // vérifie le chemin correct de ton fichier de connexion

exports.reserveProjector = async (req, res) => {
    try {
      const { userId, projectorId, startTime, endTime } = req.body;
  
      // vérifier si le projecteur est disponible
      const [projectors] = await db.run('SELECT * FROM projectors WHERE id = ? AND status = "available"', [projectorId]);
      if (projectors.length === 0) return res.status(400).json({ message: 'Projecteur non disponible' });
  
      // insérer la réservation
      await db.run('INSERT INTO reservations (userId, projectorId, startTime, endTime) VALUES (?, ?, ?, ?)', 
                     [userId, projectorId, startTime, endTime]);
  
      // marquer le projecteur comme réservé
      await db.run('UPDATE projectors SET status = "reserved" WHERE id = ?', [projectorId]);
  
      res.status(201).json({ message: 'Réservation effectuée' });
  
    } catch (error) {
      res.status(500).json({ message: 'Erreur serveur', error });
    }
  };
  
  // voir les réservations
  exports.getReservations = async (req, res) => {
    try {
      const [reservations] = await db.run('SELECT * FROM reservations');
      res.json(reservations);
    } catch (error) {
      res.status(500).json({ message: 'Erreur serveur', error });
    }
  };
  
  // annuler une réservation
  exports.cancelReservation = async (req, res) => {
    try {
      const { id } = req.params;
      await db.run('DELETE FROM reservations WHERE id = ?', [id]);
      res.json({ message: 'Réservation annulée' });
    } catch (error) {
      res.status(500).json({ message: 'Erreur serveur', error });
    }
  };
  