const express = require('express');
const router = express.Router();
const CategoryController = require('../controller/categoryController.js'); // Asegúrate de que la ruta sea correcta

router.post('/categories', CategoryController.createCategory);
router.put('/categories/:id', CategoryController.updateCategory);
router.get('/categories', CategoryController.findAllCategories);
router.get('/categories/:id', CategoryController.findOneCategory);
router.put('/categories/:id/status', CategoryController.changeStatusCategory);

module.exports = router;
