const express = require('express');
const router = express.Router();
const RoleController = require('../controller/rolesController');
const authController = require('../controller/authController.js');

router.post('/roles', authController.authenticateToken, RoleController.createRole);
router.put('/roles/:id', authController.authenticateToken, RoleController.updateRole);
router.put('/roles/:id/status', authController.authenticateToken, RoleController.changeStatusRole);

// router.post('/roles', RoleController.createRole);
// router.put('/roles/:id', RoleController.updateRole);
// router.put('/roles/:id/status', RoleController.changeStatusRole);

router.get('/roles', authController.authenticateToken, RoleController.findAllRoles);
router.get('/roles/:id',authController.authenticateToken,  RoleController.findOneRole);

module.exports = router;
