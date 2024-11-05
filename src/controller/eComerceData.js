const { and } = require('sequelize');
const { ProductsPerishable, ProductsNonPerishable, Category, Batch, Client, Cart, CartDetail } = require('../model/assosiationsModels');
const { Op } = require('sequelize');

function getFullImagePaths(images) {
  const baseUrl = `${process.env.BASE_URL || 'http://localhost:3001'}/`; // Cambia el puerto y URL si es necesario
  return images.map(image => `${baseUrl}${image.replace(/\\/g, '/')}`);
}

class eComerceData {

  async FindAllProducts(req, res) {
    try {
      const productPerishables = await ProductsPerishable.findAll({
        attributes: ['product_perishable_id', 'name', 'description', 'discount', 'brand', 'images', 'price', 'keywords', 'meta_description'],
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
          id: product.product_non_perishable_id || product.product_perishable_id,
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
        attributes: ['product_non_perishable_id', 'name', 'description', 'price', 'discount', 'stock', 'brand', 'images', 'keywords', 'meta_description'],
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

      res.status(200).json(allProducts);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async productItCanInterest(req, res) {
    try {
      const productPerishables = await ProductsPerishable.findAll({
        attributes: ['product_perishable_id', 'name', 'description', 'brand', 'images', 'price', 'keywords', 'meta_description'],
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
        attributes: ['product_non_perishable_id', 'name', 'description', 'price', 'stock', 'brand', 'images', 'keywords', 'meta_description'],
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
    }
  }

  async productsWithDiscount(req, res) {
    try {
      const productPerishables = await ProductsPerishable.findAll({
        attributes: ['product_perishable_id', 'name', 'description', 'brand', 'images', 'price', 'discount', 'keywords', 'meta_description'],
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
        attributes: ['product_non_perishable_id', 'name', 'description', 'price', 'stock', 'brand', 'images', 'discount', 'keywords', 'meta_description'],
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
    }
  }
  

  async findProductsType(req, res) {
    const { typeProduct } = req.params;
    try {
      const productPerishables = await ProductsPerishable.findAll({
        attributes: ['product_perishable_id', 'name', 'description', 'discount', 'brand', 'images', 'price', 'keywords', 'meta_description'],
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
        attributes: ['product_non_perishable_id', 'name', 'description', 'price', 'discount', 'stock', 'brand', 'images', 'keywords', 'meta_description'],
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

  async createClient(req, res) {  
    try {
      const { name, email } = req.body;
      
      let client = await Client.findOne({ where: { email } });
      if (!client) {
        client = await Client.create({
          username: name,
          email,
          registration_date: new Date(),
        });
      }

      res.status(200).json({ message: 'logged in' });
    } catch (error) {
      res.status(200).json({ message: 'logged' + error});
    }
  }

  async getCartDetails(req, res) {
    try {
      // Obtener el email del usuario. En un entorno real, esto debería obtenerse de la sesión o token de autenticación.
      const email = req.params.email;
      
      // Buscar al cliente por email
      const client = await Client.findOne({ where: { email } });
      if (!client) {
        return res.status(404).json({ error: 'Client not found' });
      }
  
      // Obtener el carrito del cliente, incluyendo los detalles del carrito y los productos asociados
      const cart = await Cart.findAll({
        where: { client_id: client.client_id },
        include: [
          {
            model: CartDetail,
            include: [
              {
                model: ProductsPerishable,
                attributes: ['name', 'description', 'price', 'discount', 'images'],
              },
              {
                model: ProductsNonPerishable,
                attributes: ['name', 'description', 'price', 'discount', 'images'],
              },
            ],
          },
        ],
      });
  
      if (!cart || cart.length === 0) {
        return res.status(404).json({ error: 'Cart not found' });
      }
  
      // Calcular el monto total (amount)
      let totalAmount = 0;
  
      // Iterar sobre cada carrito (en caso de múltiples)
      cart.forEach((cartItem) => {
        // Iterar sobre cada detalle del carrito
        cartItem.CartDetails.forEach((detail) => {
          let price = 0;
  
          // Determinar el precio según el tipo de producto
          if (detail.ProductsPerishable) {
            price = detail.ProductsPerishable.price;
          } else if (detail.ProductsNonPerishable) {
            price = detail.ProductsNonPerishable.price;
          }
  
          // Calcular subtotal para este detalle
          const subtotal = detail.quantity * price;
  
          // Sumar al totalAmount
          totalAmount += subtotal;
        });
      });
  
      res.status(200).json({
        amount: totalAmount,
        cart: cart,
      });
    } catch (error) {
      console.error('Error getting cart details:', error);
      res.status(400).json({ error: error.message });
    }
  }
  
}

module.exports = new eComerceData();
