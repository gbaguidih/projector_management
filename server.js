require('dotenv').config();
const express = require('express');

const authRoutes = require('./routes/authRoutes');

const projectorRoutes = require('./routes/projectorRoutes');
const reservationRoutes = require('./routes/reservationRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({ message: "Serveur Node.js avec Express fonctionne " });
});




// Définition des routes
app.use('/api/auth', authRoutes);
app.use('/api/auth2', adminRoutes);
app.use('/api/projectors', projectorRoutes);
app.use('/api/reservations', reservationRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Une erreur interne est survenue' });
});

// Démarrer le serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(` Serveur démarré sur http://localhost:${PORT}`);
});








