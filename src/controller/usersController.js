'use strict';
const User = require('../model/usersModel');
const bcrypt = require('bcrypt');
const saltRounds = 10; 
class UserController {

  async createUser(req, res) {
    try {
      // Encriptar la contraseña antes de crear el usuario
      const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
      
      // Crear el nuevo usuario con la contraseña encriptada
      const newUser = await User.create({
        ...req.body, // Copia todos los demás campos del cuerpo de la solicitud
        password: hashedPassword // Reemplaza la contraseña con la encriptada
      });

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
      
      // Verificar si la contraseña está en el cuerpo de la solicitud
      if (req.body.password) {
        // Encriptar la nueva contraseña
        req.body.password = await bcrypt.hash(req.body.password, saltRounds);
      }
  
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
  
      // Obtener el usuario actual
      const user = await User.findOne({ where: { user_id: id } });
  
      if (user) {
        // Invertir el estado actual
        const newState = !user.state;
  
        // Actualizar el usuario con el nuevo estado
        await user.update({ state: newState });
  
        // Enviar una respuesta indicando el nuevo estado
        res.status(200).json({ message: 'Estado del usuario cambiado', newState });
      } else {
        res.status(404).json({ error: 'Usuario no encontrado' });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }  
}

module.exports = new UserController();
