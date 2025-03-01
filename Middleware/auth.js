const jwt = require("jsonwebtoken");

// Vérifie la présence et la validité du token JWT
function verifyToken(req, res, next) {
    const token = req.headers['x-access-token'];
    if (!token) {
        return res.status(403).send('Aucun token fourni'); //Retourne une erreur si l'utilisateur n'est pas authentifié
    }

// Décode le token et attache l'utilisateur à req.user
    jwt.verify(token, 'votre-clé-secrète', (err, decoded) => {
        if (err) {
            return res.status(500).send("Échec de l'authentification du token"); //Renvoie les informations de l'utilisateur authentifié
        }
        req.userId = decoded.id;
        next();
    });
}

module.exports = verifyToken;
