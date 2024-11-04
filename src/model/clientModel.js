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
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true
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
}, {
  sequelize,
  modelName: 'Client',
  tableName: 'clients',
  timestamps: false
});

module.exports = Client;
