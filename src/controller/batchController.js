'use strict';
const Batch = require('../model/batchesModel.js');

function parseDate(input) {
  const [day, month, year] = input.split('/').map(Number);
  return new Date(year, month - 1, day).toISOString().slice(0, 19).replace('T', ' ');
}

class BatchController {
  async createBatch(req, res) {
    try {
      const { quantity, expiration_date, manufacturin_date } = req.body;

      // Convertir las fechas del formato dd/mm/yyyy al formato yyyy-mm-dd
      const formattedExpirationDate = parseDate(expiration_date);
      const formattedManufacturinDate = parseDate(manufacturin_date);

      // Obtener la fecha y hora actual
      const currentDateTime = new Date().toISOString().slice(0, 19).replace('T', ' ');

      const newBatch = await Batch.create({
        quantity,
        expiration_date: formattedExpirationDate,
        manufacturin_date: formattedManufacturinDate,
        fecha_notificacion: currentDateTime
      });

      res.status(201).json(newBatch);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async updateBatch(req, res) {
    try {
      const { id } = req.params;
      const { quantity, expiration_date, manufacturin_date } = req.body;

      // Convertir las fechas del formato dd/mm/yyyy al formato yyyy-mm-dd
      const formattedExpirationDate = parseDate(expiration_date);
      const formattedManufacturinDate = parseDate(manufacturin_date);

      const [updated] = await Batch.update({
        quantity,
        expiration_date: formattedExpirationDate,
        manufacturin_date: formattedManufacturinDate
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

  async findAllBatches(req, res) {
    try {
      const batches = await Batch.findAll();
      res.status(200).json(batches);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

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

  async changeStatusBatch(req, res) {
    try {
      const { id } = req.params;
      const [updated] = await Batch.update({ state: false }, { where: { batch_id: id } });
      if (updated) {
        res.status(200).json({ message: 'Estado cambiado' });
      } else {
        res.status(404).json({ error: 'Batch no encontrado' });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = new BatchController();
