const express = require('express');
const router = express.Router();
const BatchController = require('../controller/batchController');
const authController = require('../controller/authController.js');


router.post('/batches', authController.authenticateToken, BatchController.createBatch);

// Las demás rutas no están protegidas
router.put('/batches/:id', BatchController.updateBatch);
router.get('/batches/:id', BatchController.findOneBatch);
router.get('/batches', BatchController.findAllBatches);
router.put('/batches/:id/status', BatchController.changeStatusBatch);

module.exports = router;

