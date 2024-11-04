'use strict'; 
const Client = require('../model/clientModel'); 
const bcrypt = require('bcrypt');
const saltRounds = 10; 

class ClientController {

  async createClient(req, res) {
    try {
      const { first_name, last_name, email, password, username } = req.body;
      if (!first_name || !last_name || !email || !password || !username) {
        return res.status(400).json({ error: 'Faltan campos obligatorios.' });
      }

      const existingClient = await Client.findOne({ where: { email } });
      if (existingClient) {
        return res.status(409).json({ error: 'El correo electrónico ya está en uso.' });
      }

      const hashedPassword = await bcrypt.hash(password, saltRounds);

      const newClient = await Client.create({
        ...req.body,
        password: hashedPassword, //contraseña encriptada
        registration_date: new Date()
      });

      const { password: _, ...clientData } = newClient.toJSON();

      res.status(201).json(clientData);
    } catch (error) {
      console.error('Error creando el cliente:', error);
      res.status(400).json({ error: error.message });
    }
  }

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

  async findOneClient(req, res) {
    try {
      const { id } = req.params;
      const client = await Client.findOne({ 
        where: { client_id: id },
        attributes: { exclude: ['password'] },
      });
      if (client) {
        res.status(200).json(client);
      } else {
        res.status(404).json({ error: 'Cliente no encontrado' });
      }
    } catch (error) {
      console.error('Error obteniendo el cliente:', error);
      res.status(400).json({ error: error.message });
    }
  }

  async updateClient(req, res) {
    try {
      const { id } = req.params;
      
      const client = await Client.findOne({ where: { client_id: id } });
      if (!client) {
        return res.status(404).json({ error: 'Cliente no encontrado' });
      }

      // Si se proporciona una nueva contraseña, encriptarla
      if (req.body.password) {
        req.body.password = await bcrypt.hash(req.body.password, saltRounds);
      }

      const [updated] = await Client.update(req.body, { where: { client_id: id } });

      if (updated) {
        const updatedClient = await Client.findOne({ 
          where: { client_id: id },
          attributes: { exclude: ['password'] },
        });
        res.status(200).json(updatedClient);
      } else {
        res.status(404).json({ error: 'Cliente no encontrado' });
      }
    } catch (error) {
      console.error('Error actualizando el cliente:', error);
      res.status(400).json({ error: error.message });
    }
  }

  async changeStatusClient(req, res) {
    try {
      const { id } = req.params;
  
      const client = await Client.findOne({ where: { client_id: id } });
  
      if (client) {
        const newState = !client.state;

        await client.update({ state: newState });
  
        const { password: _, ...clientData } = client.toJSON();
        res.status(200).json({ message: 'Estado del cliente cambiado', newState, client: clientData });
      } else {
        res.status(404).json({ error: 'Cliente no encontrado' });
      }
    } catch (error) {
      console.error('Error cambiando el estado del cliente:', error);
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = new ClientController();
