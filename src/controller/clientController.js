'use strict';
const Client  = require('../model/clientModel.js'); 

class ClientController {
  async createClient(req, res) {
    try {
      const newClient = await Client.create(req.body);
      res.status(201).json(newClient);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async updateClient(req, res) {
    try {
      const { id } = req.params;
      const [updated] = await Client.update(req.body, { where: { client_id: id } });
      if (updated) {
        const updatedClient = await Client.findOne({ where: { client_id: id } });
        res.status(200).json(updatedClient);
      } else {
        res.status(404).json({ error: 'Cliente no encontrado' });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async findAllClients(req, res) {
    try {
      const clients = await Client.findAll();  
        res.status(200).json(clients);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async findOneClient(req, res) {
    try {
      const { id } = req.params;
      const foundClient = await Client.findOne({ where: { client_id: id } });
      if (foundClient) {
        res.status(200).json(foundClient);
      } else {
        res.status(404).json({ error: 'Cliente no encontrado' });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async changeStatusClient(req, res) {
    try {
      const { id } = req.params;
      const [updated] = await Client.update({ state: false }, { where: { client_id: id } });
      if (updated) {
        res.status(200).json({ message: 'Estado cambiado' });
      } else {
        res.status(404).json({ error: 'Cliente no encontrado' });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = new ClientController();
