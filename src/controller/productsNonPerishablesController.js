'use strict';
const ProductsNonPerishable = require('../model/productsNonPerishablesModel.js');

function getCurrentDateTime() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

// Función para formatear la fecha en dd/mm/yyyy hh:mm
function formatDateTime(date) {
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  const hours = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');
  
  return `${day}/${month}/${year} ${hours}:${minutes}`;
}

class ProductsNonPerishablesController {
  async createProductsNonPerishables(req, res) {
    try {
      const { nombre, descripcion, precio, descuento, stock, categoria_id, marca, imagenes, supplier_id } = req.body;

      // Obtener la fecha y hora actual
      const fecha_creacion = getCurrentDateTime();

      const newProduct = await ProductsNonPerishable.create({
        nombre,
        descripcion,
        precio,
        descuento,
        stock,
        categoria_id,
        marca,
        imagenes,
        supplier_id,
        fecha_creacion,
        state: true
      });

      newProduct.dataValues.fecha_creacion = formatDateTime(newProduct.fecha_creacion);

      res.status(201).json(newProduct);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async updateProductsNonPerishables(req, res) {
    try {
      const { id } = req.params;
      const { nombre, descripcion, precio, descuento, stock, categoria_id, marca, imagenes, supplier_id } = req.body;

      const [updated] = await ProductsNonPerishable.update({
        nombre,
        descripcion,
        precio,
        descuento,
        stock,
        categoria_id,
        marca,
        imagenes,
        supplier_id
      }, { where: { products_non_perishables_id: id } });

      if (updated) {
        const updatedProduct = await ProductsNonPerishable.findOne({ where: { products_non_perishables_id: id } });
        updatedProduct.dataValues.fecha_creacion = formatDateTime(updatedProduct.fecha_creacion);

        res.status(200).json(updatedProduct);
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

      products.forEach(product => {
        product.dataValues.fecha_creacion = formatDateTime(product.fecha_creacion);
      });

      res.status(200).json(products);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async findOneProductsNonPerishables(req, res) {
    try {
      const { id } = req.params;
      const foundProduct = await ProductsNonPerishable.findOne({ where: { products_non_perishables_id: id } });
      if (foundProduct) {

        foundProduct.dataValues.fecha_creacion = formatDateTime(foundProduct.fecha_creacion);

        res.status(200).json(foundProduct);
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
      const [updated] = await ProductsNonPerishable.update({ state: false }, { where: { products_non_perishables_id: id } });
      if (updated) {
        res.status(200).json({ message: 'Estado cambiado' });
      } else {
        res.status(404).json({ error: 'Producto no perecedero no encontrado' });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = new ProductsNonPerishablesController();
