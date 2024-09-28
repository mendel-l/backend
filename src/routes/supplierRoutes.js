const express = require('express');
const router = express.Router();
const SupplierController = require('../controller/suppliersController.js'); 
const authController = require('../controller/authController.js');

router.post('/suppliers', authController.authenticateToken, SupplierController.createSupplier);
router.put('/suppliers/:id', authController.authenticateToken, SupplierController.updateSupplier);
router.put('/suppliers/:id', authController.authenticateToken, SupplierController.changeStatusSupplier);

// router.post('/suppliers', SupplierController.createSupplier);
// router.put('/suppliers/:id', SupplierController.updateSupplier);
// router.put('/suppliers/:id', SupplierController.changeStatusSupplier);

router.get('/suppliers/:id', SupplierController.findOneSupplier);
router.get('/suppliers', SupplierController.findAllSuppliers);

module.exports = router;
