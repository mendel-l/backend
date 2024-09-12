'use strict';
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../database.js'); 

class Batch extends Model {
  static associate(models) {
  }
}

Batch.init({
  batch_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  expiration_date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  fecha_notificacion: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
  },
  manufacturin_date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  state: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  }
}, {
  sequelize,
  modelName: 'Batch',
  tableName: 'batches',
  timestamps: false
});

module.exports = Batch;
