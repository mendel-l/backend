const { and } = require('sequelize');
const { ProductsPerishable, ProductsNonPerishable, Category, Batch, Supplier } = require('../model/assosiationsModels');
class eComerceData {

  async FindAllProducts(req, res) {
    try {
      // Obtener productos perecederos
      const productPerishables = await ProductsPerishable.findAll({
        attributes: ['name', 'description', 'discount', 'brand', 'images', 'price'],
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
        // Eliminar información innecesaria y mantener solo lo que necesitas
        return {
          name: product.name,
          description: product.description,
          discount: product.discount,
          brand: product.brand,
          images: product.images,
          price: product.price,
          category: product.Category.name,
          quantity: product.quantity
        };
      });
  
      // Obtener productos no perecederos
      const productNonPerishable = await ProductsNonPerishable.findAll({
        attributes: ['name', 'description', 'price', 'discount', 'stock', 'brand', 'images'],
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
          images: product.images,
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
        attributes: ['name', 'description', 'discount', 'brand', 'images', 'price'],
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
        attributes: ['name', 'description', 'price', 'discount', 'stock', 'brand', 'images'],
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
      const allProducts = [...productPerishables, ...productNonPerishable];
  
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
    const { typeProduct } = req.params; // Destructuración de los parámetros
    try {
      // Buscar productos perecederos
      const productPerishables = await ProductsPerishable.findAll({
        attributes: ['name', 'description', 'discount', 'brand', 'images', 'price'],
        include: [
          {
            model: Category,
            attributes: ['name'],
            where: { name: typeProduct }, // Acceder correctamente a la categoría
          },
          {
            model: Batch,
            attributes: ['quantity'],
          },
        ],
        where: {
          state: true, // Solo productos activos
        },
      });
  
      // Buscar productos no perecederos
      const productNonPerishable = await ProductsNonPerishable.findAll({
        attributes: ['name', 'description', 'price', 'discount', 'stock', 'brand', 'images'],
        include: [
          {
            model: Category,
            attributes: ['name'],
            where: { name: typeProduct }, // Acceder correctamente a la categoría
          },
        ],
        where: {
          state: true, // Solo productos activos
        },
      });
  
      // Combinar ambos tipos de productos
      const allProducts = [...productPerishables, ...productNonPerishable];
  
      res.status(200).json(allProducts);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
  
      
}

module.exports = new eComerceData();
