'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('reviews', {
      review_id: {
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
      calificacion: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          min: 1,
          max: 5
        }
      },
      comentario: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      fecha_comentario: {
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
    await queryInterface.dropTable('reviews');
  }
};
