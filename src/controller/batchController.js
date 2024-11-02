'use strict';
const Batch = require('../model/batchesModel.js');

function parseDate(input) {
  const [day, month, year] = input.split('/').map(Number);
  return new Date(year, month - 1, day).toISOString().slice(0, 19).replace('T', ' ');
}

class BatchController {
  // Crear un nuevo lote (batch)
  async createBatch(req, res) {
    try {
      const { quantity, expiration_date, manufacturing_date, notification_date, code_batch} = req.body;



      // Crear el nuevo lote en la base de datos
      const newBatch = await Batch.create({
        quantity,
        expiration_date,
        manufacturing_date,
        notification_date,
        state:true,
        code_batch
      });

      res.status(201).json(newBatch);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // Actualizar un lote existente
  async updateBatch(req, res) {
    try {
      const { id } = req.params;
      const { quantity, expiration_date, manufacturing_date, notification_date } = req.body;

      // Actualizar el lote con los nuevos valores
      const [updated] = await Batch.update({
        quantity,
        expiration_date,
        manufacturing_date,
        notification_date,
        code_batch
      }, { where: { batch_id: id } });

      if (updated) {
        const updatedBatch = await Batch.findOne({ where: { batch_id: id } });
        res.status(200).json(updatedBatch);
      } else {
        res.status(404).json({ error: 'Batch no encontrado' });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // Obtener todos los lotes
  async findAllBatches(req, res) {
    try {
      const batches = await Batch.findAll();
      res.status(200).json(batches);
      
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // Obtener un lote por su ID
  async findOneBatch(req, res) {
    try {
      const { id } = req.params;
      const foundBatch = await Batch.findOne({ where: { batch_id: id } });
      if (foundBatch) {
        res.status(200).json(foundBatch);
      } else {
        res.status(404).json({ error: 'Batch no encontrado' });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // Cambiar el estado de un lote a inactivo
  async changeStatusBatch(req, res) {
    try {
      const { id } = req.params;
  
      // Obtener el lote actual
      const batch = await Batch.findOne({ where: { batch_id: id } });
  
      if (batch) {
        // Invertir el estado actual
        const newState = !batch.state;
  
        // Actualizar el lote con el nuevo estado
        await batch.update({ state: newState });
  
        res.status(200).json({ message: 'Estado cambiado', newState });
      } else {
        res.status(404).json({ error: 'Batch no encontrado' });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
  
}

module.exports = new BatchController();
