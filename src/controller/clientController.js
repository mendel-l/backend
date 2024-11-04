'use strict'; 
const Client = require('../model/clientModel'); 
const bcrypt = require('bcrypt');
const saltRounds = 10; 

class ClientController {


  async findAllClients(req, res) {
    try {
      const clients = await Client.findAll({
        attributes: { exclude: ['password'] },
      });
      res.status(200).json(clients);
    } catch (error) {
      console.error('Error obteniendo los clientes:', error);
      res.status(400).json({ error: error.message });
    }
  }


}

module.exports = new ClientController();
