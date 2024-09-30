'use strict';
const ProductsNonPerishable = require('../model/productsNonPerishablesModel.js');
const path = require('path');

// Obtener la URL completa para las imágenes
function getFullImagePaths(images) {
  const baseUrl = `${process.env.BASE_URL || 'http://localhost:3001'}/`; // Cambia el puerto y URL si es necesario
  return images.map(image => `${baseUrl}${image.replace(/\\/g, '/')}`);
}

class ProductsNonPerishablesController {
  async createProductsNonPerishables(req, res) {
    try {
      let imagePaths = [];
      if (req.files && req.files.length > 0) {
        imagePaths = req.files.map(file => file.path);
        if (imagePaths.length > 5) {
          return res.status(400).json({ error: 'Máximo de 5 imágenes permitidas' });
        }
      }

      const productData = {
        ...req.body,
        images: imagePaths,
        creation_date: new Date(),
      };

      const newProduct = await ProductsNonPerishable.create(productData);

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

  async updateProductsNonPerishables(req, res) {
    try {
      const { id } = req.params;
      const updatedData = req.body;

      let imagePaths = updatedData.images || [];
      if (req.files && req.files.length > 0) {
        imagePaths = req.files.map(file => file.path);
        if (imagePaths.length > 5) {
          return res.status(400).json({ error: 'Máximo de 5 imágenes permitidas' });
        }

        updatedData.images = imagePaths;
      }

      const [updated] = await ProductsNonPerishable.update(updatedData, {
        where: { product_non_perishable_id: id },
      });

      if (updated) {
        const updatedProduct = await ProductsNonPerishable.findOne({
          where: { product_non_perishable_id: id },
        });
        res.status(200).json({
          ...updatedProduct.toJSON(),
          images: getFullImagePaths(updatedProduct.images),
        });
      } else {
        res.status(404).json({ error: 'Producto no perecedero no encontrado' });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async findAllProductsNonPerishables(req, res) {
    try {
      const products = await ProductsNonPerishable.findAll();
  
      const productsWithCorrectPrice = products.map(product => ({
        ...product.toJSON(),
        price: parseFloat(product.price), // Aseguramos que price es un número
        images: getFullImagePaths(product.images),
      }));
  
      res.status(200).json(productsWithCorrectPrice);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async findOneProductsNonPerishables(req, res) {
    try {
      const { id } = req.params;
      const foundProduct = await ProductsNonPerishable.findOne({
        where: { product_non_perishable_id: id }
      });
  
      if (foundProduct) {
        res.status(200).json({
          ...foundProduct.toJSON(),
          price: parseFloat(foundProduct.price), // Aseguramos que price es un número
          images: getFullImagePaths(foundProduct.images),
        });
      } else {
        res.status(404).json({ error: 'Producto no perecedero no encontrado' });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }  

  async changeStatusProductsNonPerishables(req, res) {
    try {
      const { id } = req.params;
      const product = await ProductsNonPerishable.findOne({
        where: { product_non_perishable_id: id },
      });

      if (!product) {
        return res.status(404).json({ error: 'Producto no perecedero no encontrado' });
      }

      const newState = !product.state;
      const [updated] = await ProductsNonPerishable.update(
        { state: newState },
        { where: { product_non_perishable_id: id } }
      );

      if (updated) {
        res.status(200).json({ message: 'Estado cambiado', newState });
      } else {
        res.status(404).json({ error: 'Producto no perecedero no encontrado' });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = new ProductsNonPerishablesController();
