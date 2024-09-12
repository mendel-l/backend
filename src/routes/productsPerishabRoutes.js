const express = require('express');
const router = express.Router();


const PorductsPerishablesController = require('../controller/productsPerishablesController.js'); 


router.post('/products_perishables', PorductsPerishablesController.createPorductsPerishables);
router.get('/products_perishables/:products_perishables_id', PorductsPerishablesController.findOnePorductsPerishables);
router.get('/products_perishables', PorductsPerishablesController.findAllPorductsPerishables);
router.put('/products_perishables/:products_perishables_id', PorductsPerishablesController.changeStatusPorductsPerishables);
router.put('/update_products_perishables/:products_perishables_id', PorductsPerishablesController.updateProductsPerishables);
module.exports = router;
