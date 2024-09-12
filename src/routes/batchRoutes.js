const express = require('express');
const router = express.Router();
const BatchController = require('../controller/batchController');

router.post('/batches', BatchController.createBatch);
router.put('/batches/:id', BatchController.updateBatch);
router.get('/batches/:id', BatchController.findOneBatch);
router.get('/batches', BatchController.findAllBatches);
router.put('/batches/:id/status', BatchController.changeStatusBatch);

module.exports = router;
