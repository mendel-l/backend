const express = require('express');
const router = express.Router();
const ClientController = require('../controller/clientController'); // Asegúrate de que la ruta sea correcta


router.post('/clients', ClientController.createClient);
router.put('/clients/:id', ClientController.updateClient);
router.get('/clients/:id', ClientController.findOneClient);
router.get('/clients', ClientController.findAllClients);
router.put('/clients/:id', ClientController.changeStatusClient);

module.exports = router;
