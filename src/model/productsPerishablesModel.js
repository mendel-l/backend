'use strict';
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../database.js'); 

  class ProductsPerisble extends Model {
    static associate(models) {
    }
  }
  ProductsPerisble.init({
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
        allowNull: false
      },
      discount: {
        type: DataTypes.DOUBLE,
        allowNull: false
      },
      category_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      brand: {
        type: DataTypes.STRING,
        allowNull: false
      },
      images: {
        type: DataTypes.JSON,
        allowNull: false
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
        allowNull: false
      }
  }, {
    sequelize,
    tableName: 'products_perishables',
    modelName: 'ProductsPerisble',
    timestamps: false
  });


module.exports=ProductsPerisble;