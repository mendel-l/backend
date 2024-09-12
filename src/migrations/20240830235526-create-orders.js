'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('orders', {
      order_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      client_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'clients',
          key: 'client_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      fecha_pedido: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      total: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      estado: {
        type: Sequelize.ENUM('en proceso', 'enviado', 'entregado', 'cancelado'),
        allowNull: false
      },
      metodo_pago: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      state: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('orders');
  }
};
