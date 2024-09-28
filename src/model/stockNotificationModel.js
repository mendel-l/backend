'use strict';
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../database.js');

class StockNotification extends Model {
  static associate(models) {
    StockNotification.belongsTo(models.ProductsPerishable, { foreignKey: 'product_perishable_id' });
    StockNotification.belongsTo(models.ProductsNonPerishable, { foreignKey: 'product_non_perishable_id' });
  }
}

StockNotification.init({
  notification_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  product_perishable_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  product_non_perishable_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  threshold: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  notification_date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  state: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  }
}, 
{
  sequelize,
  tableName: 'stock_notifications',  
  modelName: 'StockNotification',
  timestamps: false
});

module.exports = StockNotification;
