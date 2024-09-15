const express = require('express');
const router = express.Router();
const RoleController = require('../controller/rolesController');

router.post('/roles', RoleController.createRole);
router.get('/roles', RoleController.findAllRoles);
router.get('/roles/:id', RoleController.findOneRole);
router.put('/roles/:id', RoleController.updateRole);
router.put('/roles/:id/status', RoleController.changeStatusRole);

module.exports = router;
