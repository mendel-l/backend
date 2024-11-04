'use strict';

const { Op } = require('sequelize');
const sequelize = require('../../database.js'); 
const { Cart, CartDetail, ProductsNonPerishable, ProductsPerishable} = require('../model/assosiationsModels');

function getFullImagePaths(images) {
  const baseUrl = `${process.env.BASE_URL || 'http://localhost:3001'}/`; // Cambia el puerto y URL si es necesario
  return images.map(image => `${baseUrl}${image.replace(/\\/g, '/')}`);
}

class CartController {
  async createCart(req, res) {
    try {
      const { client_id } = req.body;
      
      if (!client_id) {
        return res.status(400).json({ error: 'client_id is required' });
      }

      const cart = await Cart.create({ client_id });
      res.status(201).json(cart);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async addItemToCart(req, res) {
  try{
    console.log(req.body);
    const { productId, quantity_ordered, id_client,type } = req.body;

       const result = await sequelize.transaction(async (t) => {
       const cart = await Cart.create({ client_id: id_client }, { transaction: t });

      let productDetails;
      if (type === 'perishable') {
        productDetails = await CartDetail.create({
          cart_id: cart.cart_id,
          product_perishable_id: productId,
          quantity_ordered
        }, { transaction: t });
      } else if (type === 'non-perishable') {
        productDetails = await CartDetail.create({
          cart_id: cart.id,
          product_non_perishable_id: productId,
          quantity_ordered
        }, { transaction: t });
      } else {
        throw new Error('Invalid product type');
      }

      return { cart, productDetails };
    });

    res.status(201).json(result);
  } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getCartDetails(req, res) {
    try {
      const { cart_id } = req.params;

      if (!cart_id) {
        return res.status(400).json({ error: 'cart_id is required' });
      }

      const cartDetailsWithFullImagePaths = await Promise.all(cartDetails.map(async (detail) => {
        if (detail.productNonPerishable) {
          detail.productNonPerishable.images = getFullImagePaths(detail.productNonPerishable.images);
        }
        if (detail.productPerishable) {
          detail.productPerishable.images = getFullImagePaths(detail.productPerishable.images);
        }
        return detail;
      }));

      const cartDetails = await CartDetails.findAll({
        where: { cart_id, state: true },
        include: [
          { 
            model: ProductsNonPerishable, 
            as: 'productNonPerishable',
            attributes: ['product_non_perishable_id', 'name', 'price', 'images']
          },
          { 
            model: ProductsPerishable, 
            as: 'productPerishable',
            attributes: ['product_perishable_id', 'name', 'price', 'images']
          }
        ]        
      });      

      res.status(200).json(cartDetails);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async updateCartState(req, res) {
    try {
      const { cart_id } = req.params;

      if (!cart_id) {
        return res.status(400).json({ error: 'cart_id is required' });
      }

      const cart = await Cart.findByPk(cart_id);

      if (!cart) {
        return res.status(404).json({ error: 'Cart not found' });
      }

      cart.state = !cart.state;
      await cart.save();
      res.status(200).json({ message: 'Cart state updated', newState: cart.state });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = new CartController();
