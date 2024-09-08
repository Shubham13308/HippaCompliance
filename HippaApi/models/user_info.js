'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User_info extends Model {
    static associate(models) {
     
    }
  }

  User_info.init({
    User_ID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    Username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Role: {
      type: DataTypes.STRING,
      allowNull: false
    },
    LastLogin: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'User_info',
    tableName: 'User_infos', 
    timestamps: true 
  });

  return User_info;
};
