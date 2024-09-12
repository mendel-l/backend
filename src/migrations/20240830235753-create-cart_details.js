'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('cart_details', {
      cart_detail_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      cart_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'cart',
          key: 'cart_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      products_non_perishables_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'products_non_perishables',
          key: 'products_non_perishables_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      products_perishables_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'products_perishables',
          key: 'products_perishables_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      cantidad: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      state: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('cart_details');
  }
};
