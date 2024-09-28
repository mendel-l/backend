const express = require('express');
const router = express.Router();


const PorductsPerishablesController = require('../controller/productsPerishablesController.js'); 
const authController = require('../controller/authController.js');

router.post('/products_perishables', authController.authenticateToken, PorductsPerishablesController.createPorductsPerishables);
router.put('/products_perishables/:products_perishables_id', authController.authenticateToken, PorductsPerishablesController.changeStatusPorductsPerishables);
router.put('/update_products_perishables/:products_perishables_id', authController.authenticateToken, PorductsPerishablesController.updateProductsPerishables);

// router.post('/products_perishables', PorductsPerishablesController.createPorductsPerishables);
// router.put('/products_perishables/:products_perishables_id', PorductsPerishablesController.changeStatusPorductsPerishables);
// router.put('/update_products_perishables/:products_perishables_id', PorductsPerishablesController.updateProductsPerishables);

router.get('/products_perishables/:products_perishables_id', PorductsPerishablesController.findOnePorductsPerishables);
router.get('/products_perishables', PorductsPerishablesController.findAllPorductsPerishables);

module.exports = router;
