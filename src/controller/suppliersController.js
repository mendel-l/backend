'use strict';
const Supplier = require('../model/suppliersModel.js'); 

class SupplierController {
  async createSupplier(req, res) {
    try {
      const newSupplier = await Supplier.create(req.body);
      res.status(201).json(newSupplier);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async updateSupplier(req, res) {
    try {
      const { id } = req.params;
      const [updated] = await Supplier.Supplier(req.body, { where: { supplier_id: id } });
      if (updated) {
        const updatedSupplier = await Supplier.findOne({ where: { supplier_id: id } });
        res.status(200).json(updatedSupplier);
      } else {
        res.status(404).json({ error: 'Suppliere no encontrado' });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async findAllSuppliers(req, res) {
    try {
      const Suppliers = await Supplier.findAll();  
        res.status(200).json(Suppliers);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async findOneSupplier(req, res) {
    try {
      const { id } = req.params;
      const foundSupplier = await Supplier.findOne({ where: { supplier_id: id } });
      if (foundSupplier) {
        res.status(200).json(foundSupplier);
      } else {
        res.status(404).json({ error: 'Suppliere no encontrado' });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async changeStatusSupplier(req, res) {
    try {
      const { id } = req.params;
      const [updated] = await Supplier.update({ state: false }, { where: { supplier_id: id } });
      if (updated) {
        res.status(200).json({ message: 'Estado cambiado' });
      } else {
        res.status(404).json({ error: 'Suppliere no encontrado' });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = new SupplierController();
