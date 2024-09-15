'use strict';
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../database.js'); 

class ProductsNonPerishable extends Model {
  static associate(models) {

  }
}

ProductsNonPerishable.init({
  products_non_perishables_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  nombre: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  precio: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  descuento: {
    type: DataTypes.DECIMAL(5, 2),
    allowNull: true
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  categoria_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'categories',
      key: 'categoria_id'
    }
  },
  marca: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  imagenes: {
    type: DataTypes.JSON,
    allowNull: true
  },
  fecha_creacion: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
  },
  state: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  },
  supplier_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'suppliers',
      key: 'supplier_id'
    }
  }
}, {
  sequelize,
  modelName: 'ProductsNonPerishable',
  tableName: 'products_non_perishables',
  timestamps: false
});

module.exports = ProductsNonPerishable;
