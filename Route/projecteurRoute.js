const express = require('express');
const projectorController = require('../controllers/projectorController');
const { authenticate } = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', projectorController.getProjectors);
router.post('/', authenticate, projectorController.addProjector);
router.put('/:id', authenticate, projectorController.updateProjector);
router.delete('/:id', authenticate, projectorController.deleteProjector);

module.exports = router;


