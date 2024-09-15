'use strict';
const User = require('../model/usersModel');

class UserController {

  async createUser(req, res) {
    try {
      const newUser = await User.create(req.body);
      res.status(201).json(newUser);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async findAllUsers(req, res) {
    try {
      const users = await User.findAll();
      res.status(200).json(users);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async findOneUser(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findOne({ where: { user_id: id } });
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ error: 'Usuario no encontrado' });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async updateUser(req, res) {
    try {
      const { id } = req.params;
      const [updated] = await User.update(req.body, { where: { user_id: id } });
      if (updated) {
        const updatedUser = await User.findOne({ where: { user_id: id } });
        res.status(200).json(updatedUser);
      } else {
        res.status(404).json({ error: 'Usuario no encontrado' });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async changeStatusUser(req, res) {
    try {
      const { id } = req.params;
      const [updated] = await User.update({ state: false }, { where: { user_id: id } });
      if (updated) {
        res.status(200).json({ message: 'Estado del usuario cambiado a inactivo' });
      } else {
        res.status(404).json({ error: 'Usuario no encontrado' });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = new UserController();
