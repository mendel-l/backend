const express = require('express');
const router = express.Router();
const SupplierController = require('../controller/suppliersController.js'); 


router.post('/suppliers', SupplierController.createSupplier);
router.put('/suppliers/:id', SupplierController.updateSupplier);
router.get('/suppliers/:id', SupplierController.findOneSupplier);
router.get('/suppliers', SupplierController.findAllSuppliers);
router.put('/suppliers/:id', SupplierController.changeStatusSupplier);


module.exports = router;
