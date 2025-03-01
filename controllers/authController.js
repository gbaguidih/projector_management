const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/database');

exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    db.get('SELECT * FROM users WHERE email = ?', [email], async (err, existingUser) => {
      if (err) {
        return res.status(500).json({ message: 'Erreur serveur', error: err });
      }
      if (existingUser) return res.status(400).json({ message: 'Utilisateur déjà existant' });

      const hashedPassword = await bcrypt.hash(password, 10);

      db.run('INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)', 
             [name, email, hashedPassword, role || 'student'], function(err) {
        if (err) {
          return res.status(500).json({ message: 'Erreur serveur', error: err });
        }

        res.status(201).json({ message: 'Utilisateur créé avec succès' });
      });
    });

  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    db.get('SELECT * FROM users WHERE email = ?', [email], async (err, user) => {
      if (err) {
        return res.status(500).json({ message: 'Erreur serveur', error: err });
      }
      if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ message: "Mot de passe incorrect" });

      const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

      res.json({ token });
    });

  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};

exports.profile = async (req, res) => {
  try {
    const userId = req.user.id;

    db.get('SELECT id, name, email, role FROM users WHERE id = ?', [userId], (err, user) => {
      if (err) {
        return res.status(500).json({ message: 'Erreur serveur', error: err });
      }
      if (!user) return res.status(404).json({ message: "Utilisateur introuvable" });

      res.json(user);
    });

  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};
