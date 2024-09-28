const express = require('express');
const router = express.Router();
const CategoryController = require('../controller/categoryController.js'); // Asegúrate de que la ruta sea correcta
const authController = require('../controller/authController.js');

router.post('/categories', authController.authenticateToken, CategoryController.createCategory);
router.put('/categories/:id', authController.authenticateToken, CategoryController.updateCategory);
router.put('/categories/:id/status', authController.authenticateToken, CategoryController.changeStatusCategory);

// router.post('/categories', CategoryController.createCategory);
// router.put('/categories/:id', CategoryController.updateCategory);
// router.put('/categories/:id/status', CategoryController.changeStatusCategory);

router.get('/categories', CategoryController.findAllCategories);
router.get('/categories/:id', CategoryController.findOneCategory);

module.exports = router;
