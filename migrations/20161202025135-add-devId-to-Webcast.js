'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn('Webcasts', 'devId', Sequelize.INTEGER);

  },
  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('Webcasts', 'devId');
  }
};
