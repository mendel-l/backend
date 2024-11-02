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

      const groupedPerishables = productPerishables.reduce((acc, product) => {
        const productName = product.name;

        if (acc[productName]) {
          acc[productName].quantity += product.Batch.quantity;
        } else {
          acc[productName] = {
            ...product.toJSON(),
            quantity: product.Batch.quantity
          };
          delete acc[productName].Batch;
        }

        return acc;
      }, {});

      const mergedPerishables = Object.values(groupedPerishables).map(product => {
        return {
          name: product.name,
          description: product.description,
          discount: product.discount,
          brand: product.brand,
          images: getFullImagePaths(product.images),
          price: product.price,
          category: product.Category.name,
          keywords: product.keywords,
          meta_description: product.meta_description,
          quantity: product.quantity
        };
      });

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

      const allProducts = [...mergedPerishables, ...productNonPerishable.map(product => {
        return {
          name: product.name,
          description: product.description,
          price: product.price,
          discount: product.discount,
          stock: product.stock,
          brand: product.brand,
          images: getFullImagePaths(product.images),
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
        attributes: ['name', 'description', 'brand', 'images', 'price', 'keywords', 'meta_description'],
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
          discount: 0,
        },
      });
  
      const productNonPerishable = await ProductsNonPerishable.findAll({
        attributes: ['name', 'description', 'price', 'stock', 'brand', 'images', 'keywords', 'meta_description'],
        include: [
          {
            model: Category,
            attributes: ['name'],
          },
        ],
        where: {
          state: true,
          discount: 0,
        },
      });
  
      const allProducts = [
        ...productPerishables.map(product => ({
          ...product.toJSON(),
          images: getFullImagePaths(product.images),
        })),
        ...productNonPerishable.map(product => ({
          ...product.toJSON(),
          images: getFullImagePaths(product.images),
        })),
      ];
  
      function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
      }
    
      const shuffledProducts = shuffle(allProducts);
      const limitedProducts = shuffledProducts.slice(0, 6);
  
      res.status(200).json(limitedProducts);
    } catch (error) {
      res.status(400).json({ error: error.message });
      console.log(error);
    }
  }

  async productsWithDiscount(req, res) {
    try {
      const productPerishables = await ProductsPerishable.findAll({
        attributes: ['name', 'description', 'brand', 'images', 'price', 'discount', 'keywords', 'meta_description'],
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
          discount: {
            [Op.gt]: 0,
          },
        },
      });
  
      const productNonPerishable = await ProductsNonPerishable.findAll({
        attributes: ['name', 'description', 'price', 'stock', 'brand', 'images', 'discount', 'keywords', 'meta_description'],
        include: [
          {
            model: Category,
            attributes: ['name'],
          },
        ],
        where: {
          state: true,
          discount: {
            [Op.gt]: 0,
          },
        },
      });
  
      const allProducts = [
        ...productPerishables.map(product => ({
          ...product.toJSON(),
          images: getFullImagePaths(product.images),
        })),
        ...productNonPerishable.map(product => ({
          ...product.toJSON(),
          images: getFullImagePaths(product.images),
        })),
      ];
  
      function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
      }
  
      const shuffledProducts = shuffle(allProducts);
      const limitedProducts = shuffledProducts.slice(0, 6);
  
      res.status(200).json(limitedProducts);
    } catch (error) {
      res.status(400).json({ error: error.message });
      console.log(error);
    }
  }
  

  async findProductsType(req, res) {
    const { typeProduct } = req.params;
    try {
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
