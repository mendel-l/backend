'use strict';
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../database.js'); 

module.exports = (sequelize) => {
  class category extends Model {
    static associate(models) {
      // Define associations here if necessary
    }
  };
  category.init({
    categoria_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    state: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  }, {
    sequelize,
    modelName: 'category',
    tableName: 'categories',
    timestamps: false
  });
  return category;
};
