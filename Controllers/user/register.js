const express = require("express");
const router = express.Router(); // router Express
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// importation de la base de donnée
const db =  require("../../config/db");


router.post('/register', async (req, res) => {
    const { nom, prenom, email, password, role  } = req.body;

    // Validation des entrées
    if (!nom || !prenom || !email || !password || !role) {
        return res.status(400).send('Tous les champs sont obligatoires');
    }

    // Validation de l'email avec une expression régulière
    const gmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!gmail.test(email)) {
        return res.status(400).send('Format d\'email invalide');
    }

    // Validation du mot de passe
    const passwords = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
    if (!passwords.test(password)) {
        return res.status(400).send('Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial');
    }

    // Vérifier si l'utilisateur existe déjà
    db.get('SELECT * FROM users WHERE email = ?', [email], async (err, row) => {
        if (err) {
            return res.status(500).send('Erreur serveur');
        }
        if (row) {
            return res.status(400).send('Cet email est déjà utilisé');
        }
    

        // Hacher le mot de passe avec bcrypt
        const hashedPassword = bcrypt.hashSync(password, 8);

        // Sauvegarder  l'utilisateur dans la base de données
        db.run(
            'INSERT INTO users (nom, prenom, email, password, role) VALUES (?, ?, ?, ?, ?)',
            [nom, prenom, email, hashedPassword, role],
            function (err) {
                if (err) {
                    return res.status(500).send("Erreur lors de l'inscription");
                }
                res.status(201).send("Utilisateur enregistré avec succès"); // Retourner un message de confirmation
            }
        );
    
    });
});

module.exports = router;

