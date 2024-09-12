'use strict';
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../database.js');

class StockNotification extends Model {
  static associate(models) {
  }
}

StockNotification.init({
  notification_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  products_perishables_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  products_non_perishables_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  threshold: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  fecha_notificacion: {
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
  tableName: 'stock_notifications',  // Nombre de la tabla corregido
  modelName: 'StockNotification',
  timestamps: false
});

module.exports = StockNotification;
