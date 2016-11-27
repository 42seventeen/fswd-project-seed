'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    // Below should be a plural
    return queryInterface.createTable('Webcasts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      webcastDate: {
        type: Sequelize.DATEONLY
      },
      venue: {
        type: Sequelize.STRING
      },
      clientName: {
        type: Sequelize.STRING
      },
      clientEmail: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      UserId: {
        type: Sequelize.INTEGER
      }
    });
  },

  dn: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('Webcasts');
  }
};
