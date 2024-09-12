'use strict';
const ProductsPerisble = require('../model/productsPerishablesModel.js'); 

class PorductsPerishablesController {
  async createPorductsPerishables(req, res) {
    try {
        const newProdcut = await ProductsPerisble.create(req.body);
          
         res.status(201).json(newProdcut);
    } catch (error) {
      res.status(400).json({ error: error });
    }
  }
  async updateProductsPerishables(req, res) {
    try {
      const { products_perishables_id } = req.params;  
      const updatedData = req.body;  
      const [updated] = await ProductsPerisble.update(updatedData, {
        where: { products_perishables_id }
      });
  
      if (updated) {
        res.status(200).json({ message: 'Producto actualizado correctamente' });
      } else {
        res.status(404).json({ error: 'Producto no encontrado' });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
  
  async findAllPorductsPerishables(req, res) {
    try {
      const productsPerisble = await ProductsPerisble.findAll();  
        res.status(200).json(productsPerisble);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async findOnePorductsPerishables(req, res) {
    try {
      const {products_perishables_id} = req.params;
      const foundproductsPerisble = await ProductsPerisble.findOne({ where: { products_perishables_id: products_perishables_id } });
      if (foundproductsPerisble) {
        res.status(200).json(foundproductsPerisble);
      } else {
        res.status(404).json({ error: 'Producto no encontrado' });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async changeStatusPorductsPerishables(req, res) {
    try {
      const { products_perishables_id } = req.params;
      const product = await ProductsPerisble.findOne({
        where: { products_perishables_id: products_perishables_id }
      });
  
      if (!product) {
        return res.status(404).json({ error: 'Producto no encontrado' });
      }
      const newState = !product.state;
      const [updated] = await ProductsPerisble.update(
        { state: newState },
        { where: { products_perishables_id: products_perishables_id } }
      );
      if (updated) {
        res.status(200).json({ message: 'Estado cambiado', newState });
      } else {
        res.status(404).json({ error: 'Producto no encontrado' });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
  
}

module.exports = new PorductsPerishablesController();
