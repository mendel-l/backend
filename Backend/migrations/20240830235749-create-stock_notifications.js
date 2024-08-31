'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('stock_notifications', {
      notification_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
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
      threshold: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      fecha_notificacion: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      state: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('stock_notifications');
  }
};
