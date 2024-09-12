'use strict';
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../database.js'); // Asegúrate de que esta ruta sea correcta

class Client extends Model {
  static associate(models) {
  }
}

Client.init({
  client_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  nombre: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  apellido: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true
  },
  contraseña: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  telefono: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  direccion: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  tipo_usuario: {
    type: DataTypes.ENUM('cliente', 'administrador'),
    allowNull: false
  },
  fecha_registro: {
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
