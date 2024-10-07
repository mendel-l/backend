'use strict';
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../database.js'); 

class ProductsPerishable extends Model {
  static associate(models) {
    ProductsPerishable.belongsTo(models.Category, { foreignKey: 'category_id' });
    ProductsPerishable.belongsTo(models.Supplier, { foreignKey: 'supplier_id' });
    ProductsPerishable.belongsTo(models.Batch, { foreignKey: 'batch_id' });
  }
}

ProductsPerishable.init({
  product_perishable_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true
  },
  discount: {
    type: DataTypes.DOUBLE,
    allowNull: true
  },
  category_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  brand: {
    type: DataTypes.STRING,
    allowNull: true
  },
  images: {
    type: DataTypes.JSON,
    allowNull: true
  },
  creation_date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  state: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  },
  batch_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  supplier_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  price: {
    type: DataTypes.DOUBLE,
    allowNull: true
  },
  keywords: {
    type: DataTypes.STRING,
    allowNull: true
  },
  meta_description: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  sequelize,
  modelName: 'ProductsPerishable',
  tableName: 'products_perishables',
  timestamps: false
});

module.exports = ProductsPerishable;
