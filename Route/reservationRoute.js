const express = require('express');
const { reserveProjector, getReservations, cancelReservation } = require('../controllers/reservationController');
const { authenticate } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', authenticate, reserveProjector);
router.get('/', authenticate, getReservations);
router.delete('/:id', authenticate, cancelReservation);

module.exports = router;
