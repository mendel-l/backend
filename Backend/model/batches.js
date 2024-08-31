'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class batch extends Model {
    static associate(models) {
      // Define associations here if necessary
    }
  };
  batch.init({
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
      allowNull: false,
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
    modelName: 'batch',
    tableName: 'batches',
    timestamps: false
  });
  return batch;
};
