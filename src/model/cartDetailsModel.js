'use strict';
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../database.js');

class CartDetails extends Model {
  static associate(models) {
    CartDetails.belongsTo(models.Cart, { foreignKey: 'cart_id', as: 'cart' });
    CartDetails.belongsTo(models.ProductsNonPerishable, { foreignKey: 'product_non_perishable_id', as: 'productNonPerishable' });
    CartDetails.belongsTo(models.ProductsPerishable, { foreignKey: 'product_perishable_id', as: 'productPerishable' });    
  }
}

CartDetails.init({
  cart_detail_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  cart_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'cart',
      key: 'cart_id'
    }
  },
  product_non_perishable_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'products_non_perishables',
      key: 'product_non_perishable_id'
    }
  },
  product_perishable_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'products_perishables',
      key: 'product_perishable_id'
    }
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1
  },
  state: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  }
}, {
  sequelize,
  modelName: 'CartDetails',
  tableName: 'cart_details',
  timestamps: false
});

module.exports = CartDetails;
