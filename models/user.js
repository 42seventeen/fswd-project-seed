'use strict';

var bcrypt = require('bcrypt');

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING
    },
    username: {
      type: DataTypes.STRING,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      set: function(val) {
        this.setDataValue('password', bcrypt.hashSync(val, 8));
      },
      validate: {
        notIn: [['password']],
        notEmpty: true
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true,
        notEmpty: true
      }
    },
    role: {
      type: DataTypes.STRING
    }
  },
    {
    instanceMethods: {
      isValidPassword: function(password) {
        return bcrypt.compareSync(password, this.password);
      }
    },
    classMethods: {
      associate: function(models) {
      User.hasMany(models.Webcast)
      }
    },
    validate: {
    },
    scopes: {
      devs: {
        where: {
          role: 'Developer'
        }
      },
      producers: {
        where: {
          role: 'Producer'
        }
      },
      alphabetize: {
        order: '"name" ASC'
      },
    }
  });
  return User;
};
