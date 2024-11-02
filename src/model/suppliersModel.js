'use strict';
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../database.js'); 


  class Supplier extends Model {
    static associate(models) {
    }
  };
  Supplier.init({
    supplier_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    phone: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(255),
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
    }
  }, {
    sequelize,
    modelName: 'supplier',
    tableName: 'suppliers',
    timestamps: false
  });
  
module.exports= Supplier;

