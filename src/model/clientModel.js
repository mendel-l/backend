'use strict';
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../database.js');

class Client extends Model {
  static associate(models) {
    Client.hasMany(models.Cart, { foreignKey: 'client_id' });
    Client.hasMany(models.Order, { foreignKey: 'client_id' });
    Client.hasMany(models.Review, { foreignKey: 'client_id' });
  }
}

Client.init({
  client_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  first_name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  last_name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  phone: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  address: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  username: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  registration_date: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  state: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  }
}, {
  sequelize,
  modelName: 'Client',
  tableName: 'clients',
  timestamps: false
});

module.exports = Client;
