const express = require('express');
const eComerceData = require('../controller/eComerceData'); // Asegúrate de que la ruta sea correcta

const router = express.Router();

// Ruta para iniciar sesión
router.get('/data/products', eComerceData.FindAllProducts);


module.exports = router;
