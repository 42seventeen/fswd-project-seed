// Webcast Model Definition

'use strict';

module.exports = function(sequelize, DataTypes) {
  var Webcast = sequelize.define('Webcast', {
    title: {
      type: DataTypes.STRING
    },
    webcastDate: {
      type: DataTypes.DATEONLY
    },
    venue: {
      type: DataTypes.STRING
    },
    clientName: {
      type: DataTypes.STRING
    },
    clientEmail: {
      type: DataTypes.STRING
    },
    UserId: {
      type: DataTypes.INTEGER
    },
    devId: {
      type: DataTypes.INTEGER
    },
    ChannelId: {
      type: DataTypes.INTEGER
    }
  },
  {
    instanceMethods: {
    },
    classMethods: {
      associate: function(models) {
        Webcast.belongsTo(models.User),
        Webcast.belongsTo(models.Channel)
      }
    },
    validate: {
      // Validation stuff to come later
    },
    scopes: {
      scheduled: {
        where: {
          webcastDate: {
            $gte: new Date()
          }
        }
      },
      past: {
        where: {
          webcastDate: {
            $lt: new Date()
          }
        }
      },
      datesASC: {
        order: '"webcastDate" ASC'
      },
      datesDESC: {
        order: '"webcastDate" DESC'
      }
    }
  });
  return Webcast;
};
