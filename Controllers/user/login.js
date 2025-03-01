// etudiant 2
const express = require("express");
const router = express.Router(); // router Express
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// importation de la base de donnée
const db =  require("../../config/db");


router.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Validation des entrées de l'utilisateur 
    if (!email || !password) {
        return res.status(400).send('Email et mot de passe sont obligatoires');
    }

    // Trouver l'utilisateur dans la base de données
    db.get('SELECT * FROM users WHERE email = ?', [email], async (err, user) => {
        if (err) {
            return res.status(500).send('Erreur serveur');
        }
        if (!user) {
            return res.status(404).send('Utilisateur non trouvé');
        }

    // Comparer le mot de passe avec bcrypt
    const passwordIsValid = await bcrypt.compare(password, user.password);
    if (!passwordIsValid) {
        return res.status(401).send({ auth: false, token: null, message: 'Mot de passe incorrect' });
    }

    // Générer un token JWT avec le role inclus
    const token = jwt.sign({ id: user.id_user , role: user.role}, 'votre-clé-secrète', {
        expiresIn: 86400 // Expire après 24 heures
    }); 

    res.status(200).send({ auth: true, token, user: { id: user.id_user, email: user.email, role: user.role } });
});
});

module.exports = router;
