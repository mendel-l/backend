'use strict';
const ProductsPerishables = require('../model/productsPerishablesModel.js');
const path = require('path');

// Obtener la URL completa para las imágenes
function getFullImagePaths(images) {
  const baseUrl = `${process.env.BASE_URL || 'http://localhost:3001'}/`; // Cambia el puerto y URL si es necesario
  return images.map(image => `${baseUrl}${image.replace(/\\/g, '/')}`); // Convertimos las barras invertidas a normales
}

class ProductsPerishablesController {
  async createProductsPerishables(req, res) {
    try {
      let imagePaths = [];
      if (req.files && req.files.length > 0) {
        imagePaths = req.files.map(file => file.path);
        if (imagePaths.length > 5) {
          return res.status(400).json({ error: 'Máximo de 5 imágenes permitidas' });
        }
      }

      // Crear el objeto del producto con las imágenes
      const productData = {
        ...req.body,
        images: imagePaths,
        creation_date: new Date(),
      };

      const newProduct = await ProductsPerishables.create(productData);

      // Retornar las imágenes con URL completa
      const productWithFullImagePaths = {
        ...newProduct.toJSON(),
        images: getFullImagePaths(newProduct.images),
      };

      res.status(201).json(productWithFullImagePaths);
    } catch (error) {
      res.status(400).json({ error: error.message });
      console.log(error);
    }
  }

  async updateProductsPerishables(req, res) {
    try {
      const { product_perishable_id } = req.params;
      const updatedData = req.body;

      // Si hay nuevas imágenes cargadas, actualiza el campo 'images'
      let imagePaths = updatedData.images || [];
      if (req.files && req.files.length > 0) {
        imagePaths = req.files.map(file => file.path);
        if (imagePaths.length > 5) {
          return res.status(400).json({ error: 'Máximo de 5 imágenes permitidas' });
        }

        updatedData.images = imagePaths;
      }

      const [updated] = await ProductsPerishables.update(updatedData, {
        where: { product_perishable_id },
      });

      if (updated) {
        const updatedProduct = await ProductsPerishables.findOne({
          where: { product_perishable_id },
        });
        res.status(200).json({
          ...updatedProduct.toJSON(),
          images: getFullImagePaths(updatedProduct.images),
        });
      } else {
        res.status(404).json({ error: 'Producto no encontrado' });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async findAllProductsPerishables(req, res) {
    try {
      const productsPerishables = await ProductsPerishables.findAll();

      const productsWithFullImagePaths = productsPerishables.map(product => ({
        ...product.toJSON(),
        images: getFullImagePaths(product.images),
      }));

      res.status(200).json(productsWithFullImagePaths);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async findOneProductsPerishables(req, res) {
    try {
      const { product_perishable_id } = req.params;
      const foundProduct = await ProductsPerishables.findOne({
        where: { product_perishable_id }
      });

      if (foundProduct) {
        res.status(200).json({
          ...foundProduct.toJSON(),
          images: getFullImagePaths(foundProduct.images),
        });
      } else {
        res.status(404).json({ error: 'Producto no encontrado' });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async changeStatusProductsPerishables(req, res) {
    try {
      const { product_perishable_id } = req.params;
      const product = await ProductsPerishables.findOne({
        where: { product_perishable_id },
      });

      if (!product) {
        return res.status(404).json({ error: 'Producto no encontrado' });
      }

      const newState = !product.state;
      const [updated] = await ProductsPerishables.update(
        { state: newState },
        { where: { product_perishable_id } }
      );

      if (updated) {
        res.status(200).json({ message: 'Estado cambiado', newState });
      } else {
        res.status(404).json({ error: 'Producto no encontrado' });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
      console.log(error)
    }
  }
}

module.exports = new ProductsPerishablesController();
