const express = require('express');
const isAdmin = require('../middlewares/isAdmin');
const { getAdminDashboard } = require('../controllers/adminController');

const router = express.Router();

// Route protégée par le middleware isAdmin
router.get('/admin-dashboard', isAdmin, getAdminDashboard);

module.exports = router;
