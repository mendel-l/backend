'use strict';
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../database.js'); 

  class ProductsPerisble extends Model {
    static associate(models) {
    }
  }
  ProductsPerisble.init({
    products_perishables_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
      },
      descripcion: {
        type: DataTypes.STRING,
        allowNull: false
      },
      descuento: {
        type: DataTypes.DOUBLE,
        allowNull: false
      },
      categoria_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      marca: {
        type: DataTypes.STRING,
        allowNull: false
      },
      imagenes: {
        type: DataTypes.JSON,
        allowNull: false
      },
      fecha_creacion: {
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