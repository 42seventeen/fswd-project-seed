'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
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
      discription: {
        type: Sequelize.TEXT
      },
      // NOTE: Feel like this is going to be a problem.
      webcastDate: {
        type: Sequelize.DATEONLY
      },
      startTime: {
        type: Sequelize.TIME
      },
      duration: {
        type: Sequelize.INTEGER
      },
      venue: {
        type: Sequelize.STRING
      },
      productionLead: {
        type: Sequelize.INTEGER
      },
      developerLead: {
        type: Sequelize.INTEGER
      },
      contact: {
        type: Sequelize.STRING
      },
      contactPhone: {
        type: Sequelize.STRING
      },
      contactMobile: {
        type: Sequelize.STRING
      },
      contactEmail: {
        type: Sequelize.STRING
      },
      channelID: {
        type: Sequelize.INTEGER
      }
    });
  },

  dn: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
