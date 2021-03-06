'use strict';

module.exports = function(sequelize, DataTypes) {
  var Channel = sequelize.define('Channel', {
    name: {
      type: DataTypes.STRING,
      unique: true
    },
    URL: {
      type: DataTypes.STRING,
      unique: true
    },
    serviceID: {
      type: DataTypes.STRING
    },
    note: {
      type: DataTypes.STRING
      }
    },
    {
      instanceMethods: {
      },
      classMethods: {
        associate: function(models) {
          Channel.hasMany(models.Webcast)
        }
      },
      validate: {
        // Validation stuff to come later
      }
    });
  return Channel;
};
