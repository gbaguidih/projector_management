const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.JWT_SECRET_KEY; // Utilise une variable d'environnement

function verifyRole(roles) {
    return function (req, res, next) {
        const token = req.headers['authorization'];
        if (!token) {
            return res.status(403).json({ error: "Accès interdit" });
        }

        // Vérifier le format du token
        const tokenParts = token.split(' ');
        if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
            return res.status(403).json({ error: "Format de token invalide" });
        }
        const jwtToken = tokenParts[1];

        // Vérifier et décoder le token
        try {
            const decoded = jwt.verify(jwtToken, SECRET_KEY);
            if (!roles.includes(decoded.role)) {
                return res.status(403).json({ error: "Accès interdit pour ce rôle" });
            }
            req.user = decoded;
            next();
        } catch (err) {
            if (err.name === 'TokenExpiredError') {
                return res.status(401).json({ error: "Token expiré" });
            } else if (err.name === 'JsonWebTokenError') {
                return res.status(401).json({ error: "Token invalide" });
            } else {
                return res.status(401).json({ error: "Erreur d'authentification" });
            }
        }
    };
}

module.exports = verifyRole;