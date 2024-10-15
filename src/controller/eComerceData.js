const { and } = require('sequelize');
const { ProductsPerishable, ProductsNonPerishable, Category, Batch, Supplier } = require('../model/assosiationsModels');
const { Op } = require('sequelize');

function getFullImagePaths(images) {
  const baseUrl = `${process.env.BASE_URL || 'http://localhost:3001'}/`; // Cambia el puerto y URL si es necesario
  return images.map(image => `${baseUrl}${image.replace(/\\/g, '/')}`);
}

class eComerceData {

  async FindAllProducts(req, res) {
    try {
      // Obtener productos perecederos
      const productPerishables = await ProductsPerishable.findAll({
        attributes: ['name', 'description', 'discount', 'brand', 'images', 'price', 'keywords', 'meta_description'],
        include: [
          {
            model: Category,
            attributes: ['name'],
          },
          {
            model: Batch,
            attributes: ['quantity'],
          }
        ],
        where: {
          state: true
        }
      });

      // Crear un objeto para agrupar productos perecederos por nombre
      const groupedPerishables = productPerishables.reduce((acc, product) => {
        const productName = product.name;

        // Si el producto ya existe, sumar la cantidad del lote
        if (acc[productName]) {
          acc[productName].quantity += product.Batch.quantity;
        } else {
          // Si no existe, agregar el producto con solo la cantidad
          acc[productName] = {
            ...product.toJSON(), // Convertir el objeto Sequelize a un objeto plano
            quantity: product.Batch.quantity // Solo incluir la cantidad
          };
          delete acc[productName].Batch; // Eliminar la información innecesaria de 'Batch'
        }

        return acc;
      }, {});

      // Convertir el objeto en un array de productos perecederos agrupados
      const mergedPerishables = Object.values(groupedPerishables).map(product => {
        return {
          name: product.name,
          description: product.description,
          discount: product.discount,
          brand: product.brand,
          images: getFullImagePaths(product.images), // Corrección aquí
          price: product.price,
          category: product.Category.name,
          keywords: product.keywords,
          meta_description: product.meta_description,
          quantity: product.quantity
        };
      });

      // Obtener productos no perecederos
      const productNonPerishable = await ProductsNonPerishable.findAll({
        attributes: ['name', 'description', 'price', 'discount', 'stock', 'brand', 'images', 'keywords', 'meta_description'],
        include: [
          {
            model: Category,
            attributes: ['name'],
          }
        ],
        where: {
          state: true
        }
      });

      // Combinar productos perecederos agrupados y no perecederos
      const allProducts = [...mergedPerishables, ...productNonPerishable.map(product => {
        return {
          name: product.name,
          description: product.description,
          price: product.price,
          discount: product.discount,
          stock: product.stock,
          brand: product.brand,
          images: getFullImagePaths(product.images), // Corrección aquí
          keywords: product.keywords,
          meta_description: product.meta_description,
          category: product.Category.name
        };
      })];

      res.status(200).json(allProducts);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async productItCanInterest(req, res) {
    try {
      const productPerishables = await ProductsPerishable.findAll({
        attributes: ['name', 'description', 'discount', 'brand', 'images', 'price', 'keywords', 'meta_description'],
        include: [
          {
            model: Category,
            attributes: ['name'],
          },
          {
            model: Batch,
            attributes: ['quantity'],
          },
        ],
        where: {
          state: true,
        },
      });

      const productNonPerishable = await ProductsNonPerishable.findAll({
        attributes: ['name', 'description', 'price', 'discount', 'stock', 'brand', 'images', 'keywords', 'meta_description'],
        include: [
          {
            model: Category,
            attributes: ['name'],
          },
        ],
        where: {
          state: true,
        },
      });

      // Combinar los productos en un solo array
      const allProducts = [
        ...productPerishables.map(product => ({
          ...product.toJSON(),
          images: getFullImagePaths(product.images), // Añadir URL completa a las imágenes
        })),
        ...productNonPerishable.map(product => ({
          ...product.toJSON(),
          images: getFullImagePaths(product.images), // Añadir URL completa a las imágenes
        })),
      ];

      // Función para mezclar el array de forma aleatoria
      function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
      }

      // Mezclar los productos
      const shuffledProducts = shuffle(allProducts);

      res.status(200).json(shuffledProducts);
    } catch (error) {
      res.status(400).json({ error: error.message });
      console.log(error);
    }
  }

  async findProductsType(req, res) {
    const { typeProduct } = req.params;
    try {
      // Buscar productos perecederos
      const productPerishables = await ProductsPerishable.findAll({
        attributes: ['name', 'description', 'discount', 'brand', 'images', 'price', 'keywords', 'meta_description'],
        include: [
          {
            model: Category,
            attributes: ['name'],
            where: { name: typeProduct },
          },
          {
            model: Batch,
            attributes: ['quantity'],
          },
        ],
        where: {
          state: true,
        },
      });

      // Buscar productos no perecederos
      const productNonPerishable = await ProductsNonPerishable.findAll({
        attributes: ['name', 'description', 'price', 'discount', 'stock', 'brand', 'images', 'keywords', 'meta_description'],
        include: [
          {
            model: Category,
            attributes: ['name'],
            where: { name: typeProduct },
          },
        ],
        where: {
          state: true,
        },
      });

      // Combinar ambos tipos de productos
      const allProducts = [
        ...productPerishables.map(product => ({
          ...product.toJSON(),
          images: getFullImagePaths(product.images), // Añadir URL completa a las imágenes
        })),
        ...productNonPerishable.map(product => ({
          ...product.toJSON(),
          images: getFullImagePaths(product.images), // Añadir URL completa a las imágenes
        })),
      ];

      res.status(200).json(allProducts);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async searchProducts(req, res) {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({ error: 'Search query is required' });
    }

    try {
      const perishableProducts = await ProductsPerishable.findAll({
        where: {
          name: {
            [Op.like]: `%${query}%` // Usamos Op.like para hacer una búsqueda insensible a mayúsculas
          },
          state: true
        },
        attributes: ['name'],
      });

      const nonPerishableProducts = await ProductsNonPerishable.findAll({
        where: {
          name: {
            [Op.like]: `%${query}%` // Aquí también
          },
          state: true
        },
        attributes: ['name'],
      });

      const allProducts = [
        ...perishableProducts.map(product => product.name),
        ...nonPerishableProducts.map(product => product.name),
      ];

      res.status(200).json(allProducts);
    } catch (error) {
      console.error('Search error:', error); // Loguea el error
      res.status(500).json({ error: 'An error occurred while searching for products' });
    }
  }
}

module.exports = new eComerceData();
