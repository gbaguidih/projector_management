const jwt = require('jsonwebtoken');

const isAdmin = (req, res, next) => {
  const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: "Accès non autorisé, token manquant" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: "Accès interdit, vous n'êtes pas administrateur" });
    }

    next();

  } catch (error) {
    return res.status(401).json({ message: "Accès non autorisé, token invalide" });
  }
};

module.exports = isAdmin;
