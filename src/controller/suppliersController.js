'use strict';
const Supplier = require('../model/suppliersModel.js'); 

class SupplierController {
  async createSupplier(req, res) {
    try {
      const { phone } = req.body;

      // Validar que el teléfono tenga exactamente 8 caracteres y sea numérico
      if (!/^\d{8}$/.test(phone)) {
        return res.status(400).json({ error: 'El teléfono debe contener exactamente 8 dígitos numéricos' });
      }

      const newSupplier = await Supplier.create(req.body);
      res.status(201).json(newSupplier);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async updateSupplier(req, res) {
    try {
      const { id } = req.params;
      const { phone } = req.body;

      // Validar que el teléfono tenga exactamente 8 caracteres y sea numérico
      if (!/^\d{8}$/.test(phone)) {
        return res.status(400).json({ error: 'El teléfono debe contener exactamente 8 dígitos numéricos' });
      }

      const [updated] = await Supplier.update(req.body, { where: { supplier_id: id } });

      if (updated) {
        const updatedSupplier = await Supplier.findOne({ where: { supplier_id: id } });
        res.status(200).json(updatedSupplier);
      } else {
        res.status(404).json({ error: 'Proveedor no encontrado' });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async findAllSuppliers(req, res) {
    try {
      const suppliers = await Supplier.findAll();  
      res.status(200).json(suppliers);
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
        res.status(404).json({ error: 'Proveedor no encontrado' });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async changeStatusSupplier(req, res) {
    try {
      const { id } = req.params;
      // Obtener el proveedor actual
      const supplier = await Supplier.findOne({ where: { supplier_id: id } });
  
      if (supplier) {
        // Invertir el estado actual
        const newState = !supplier.state;
  
        // Actualizar el proveedor con el nuevo estado
        await supplier.update({ state: newState });
  
        res.status(200).json({ message: 'Estado cambiado', newState });
      } else {
        res.status(404).json({ error: 'Proveedor no encontrado' });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }  
}

module.exports = new SupplierController();
