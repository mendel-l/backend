'use strict';
const { error } = require('console');
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
    }
  }

  async updateProductsNonPerishables(req, res) {
    try {
      const { id } = req.params;
      const updatedData = req.body;
  
      // Obtener el producto actual para obtener las imágenes existentes
      const product = await ProductsNonPerishable.findOne({
        where: { product_non_perishable_id: id },
      });
  
      if (!product) {
        return res.status(404).json({ error: 'Producto no perecedero no encontrado' });
      }
  
      // Manejar imágenes existentes
      let existingImages = Array.isArray(product.images) ? product.images : JSON.parse(product.images || "[]");
  
      // Verificar si existingImages en updatedData es un string o un array, y manejarlo adecuadamente
      if (updatedData.existingImages) {
        if (typeof updatedData.existingImages === 'string') {
          existingImages = [updatedData.existingImages]; // Convertir string en array si es necesario
        } else if (Array.isArray(updatedData.existingImages)) {
          existingImages = updatedData.existingImages; // Si es un array, mantenerlo
        }
  
        // Eliminar "http://localhost:3001/" de las rutas de imágenes existentes si está presente
        existingImages = existingImages.map(image => image.replace('http://localhost:3001/', ''));
      }
  
      // Si se reciben nuevas imágenes subidas a través de la petición (req.files), agregarlas
      if (req.files && req.files.length > 0) {
        const newImagePaths = req.files.map(file => `${file.path.replace(/\\/g, '/')}`);
        existingImages = [...existingImages, ...newImagePaths]; // Combinar las imágenes existentes con las nuevas
      }
  
      // Limitar a un máximo de 5 imágenes
      if (existingImages.length > 5) {
        return res.status(400).json({ error: 'Máximo de 5 imágenes permitidas' });
      }
  
      // Actualizar los datos con las imágenes en el formato correcto (sin la URL completa)
      updatedData.images = existingImages;
  
      // Actualizamos el producto
      const [updated] = await ProductsNonPerishable.update(updatedData, {
        where: { product_non_perishable_id: id },
      });
  
      if (updated) {
        const updatedProduct = await ProductsNonPerishable.findOne({
          where: { product_non_perishable_id: id },
        });
  
        // No agregamos la URL completa aquí, solo las rutas relativas
        res.status(200).json(updatedProduct.toJSON());
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
