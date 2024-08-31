'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class role extends Model {
    static associate(models) {
      // Define associations here if necessary
    }
  };
  role.init({
    role_id: {
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
    modelName: 'role',
    tableName: 'roles',
    timestamps: false
  });
  return role;
};
