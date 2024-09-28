'use strict';
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../database.js'); 

class ProductsNonPerishable extends Model {
  static associate(models) {
    ProductsNonPerishable.belongsTo(models.Category, { foreignKey: 'category_id' });
    ProductsNonPerishable.belongsTo(models.Supplier, { foreignKey: 'supplier_id' });
  }
}

ProductsNonPerishable.init({
  product_non_perishable_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  discount: {
    type: DataTypes.DECIMAL(5, 2),
    allowNull: true
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  category_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'categories',
      key: 'category_id'  // Corrected key name
    }
  },
  brand: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  images: {
    type: DataTypes.JSON,
    allowNull: true
  },
  creation_date: {
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
