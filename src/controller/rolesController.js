'use strict';
const Role = require('../model/rolesModel');

class RoleController {

  async createRole(req, res) {
    try {
      const newRole = await Role.create(req.body);
      res.status(201).json(newRole);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async findAllRoles(req, res) {
    try {
      const roles = await Role.findAll();
      res.status(200).json(roles);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async findOneRole(req, res) {
    try {
      const { id } = req.params;
      const role = await Role.findOne({ where: { role_id: id } });
      if (role) {
        res.status(200).json(role);
      } else {
        res.status(404).json({ error: 'Rol no encontrado' });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async updateRole(req, res) {
    try {
      const { id } = req.params;
      const [updated] = await Role.update(req.body, { where: { role_id: id } });
      if (updated) {
        const updatedRole = await Role.findOne({ where: { role_id: id } });
        res.status(200).json(updatedRole);
      } else {
        res.status(404).json({ error: 'Rol no encontrado' });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async changeStatusRole(req, res) {
    try {
      const { id } = req.params;
  
      // Obtener el rol actual
      const role = await Role.findOne({ where: { role_id: id } });
  
      if (role) {
        // Invertir el estado actual
        const newState = !role.state;
  
        // Actualizar el rol con el nuevo estado
        await role.update({ state: newState });
  
        res.status(200).json({ message: 'Estado del rol cambiado', newState });
      } else {
        res.status(404).json({ error: 'Rol no encontrado' });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }  
}

module.exports = new RoleController();
