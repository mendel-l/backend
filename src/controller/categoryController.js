'use strict';
const Category = require('../model/categoriesModel.js'); // Asegúrate de que la ruta sea correcta

class CategoryController {
  async createCategory(req, res) {
    try {
      const newCategory = await Category.create(req.body);
      res.status(201).json(newCategory);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async updateCategory(req, res) {
    try {
      const { id } = req.params;
      const [updated] = await Category.update(req.body, { where: { category_id: id } }); // Cambiar a "category_id"
      if (updated) {
        const updatedCategory = await Category.findOne({ where: { category_id: id } }); // Cambiar a "category_id"
        res.status(200).json(updatedCategory);
      } else {
        res.status(404).json({ error: 'Categoría no encontrada' });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async findAllCategories(req, res) {
    try {
      const categories = await Category.findAll();
      res.status(200).json(categories);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async findOneCategory(req, res) {
    try {
      const { id } = req.params;
      const foundCategory = await Category.findOne({ where: { category_id: id } }); // Cambiar a "category_id"
      if (foundCategory) {
        res.status(200).json(foundCategory);
      } else {
        res.status(404).json({ error: 'Categoría no encontrada' });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async changeStatusCategory(req, res) {
    try {
      const { id } = req.params;
      // Obtener la categoría actual
      const category = await Category.findOne({ where: { category_id: id } });
  
      if (category) {
        // Invertir el estado actual
        const newState = !category.state;
  
        // Actualizar la categoría con el nuevo estado
        await category.update({ state: newState });
  
        res.status(200).json({ message: 'Estado cambiado', newState });
      } else {
        res.status(404).json({ error: 'Categoría no encontrada' });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }   
}

module.exports = new CategoryController();
