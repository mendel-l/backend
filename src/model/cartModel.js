'use strict';
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../database.js');

class Cart extends Model {
  static associate(models) {
    Cart.belongsTo(models.Client, { foreignKey: 'client_id', as: 'client' });
    Cart.hasMany(models.CartDetails, { foreignKey: 'cart_id', as: 'details' });
  }
}

Cart.init({
  cart_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  client_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'clients',
      key: 'client_id'
    }
  },
  creation_date: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  state: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  }
}, {
  sequelize,
  modelName: 'Cart',
  tableName: 'cart',
  timestamps: false
});

module.exports = Cart;
