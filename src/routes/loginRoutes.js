const express = require('express');
const authController = require('../controller/authController'); // Asegúrate de que la ruta sea correcta

const router = express.Router();

// Ruta para iniciar sesión
router.post('/auth/login', authController.login);

// Ruta para cerrar sesión
router.post('/auth/logout', authController.logout);


module.exports = router;
