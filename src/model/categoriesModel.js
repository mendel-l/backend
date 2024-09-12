'use strict';
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../database.js'); 

class Category extends Model {
  static associate(models) {
  }
}

Category.init({
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
  modelName: 'Category',
  tableName: 'categories',
  timestamps: false
});

module.exports = Category;
