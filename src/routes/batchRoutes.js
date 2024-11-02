const express = require('express');
const router = express.Router();
const BatchController = require('../controller/batchController');
const authController = require('../controller/authController.js');

router.post('/batches', authController.authenticateToken, BatchController.createBatch);
router.put('/batches/:id', authController.authenticateToken, BatchController.updateBatch);
router.put('/batches/:id/status', authController.authenticateToken, BatchController.changeStatusBatch);
router.get('/batches/:id',authController.authenticateToken, BatchController.findOneBatch);
router.get('/batches',authController.authenticateToken, BatchController.findAllBatches);

module.exports = router;

