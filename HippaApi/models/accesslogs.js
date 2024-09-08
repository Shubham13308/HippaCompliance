"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class AccessLogs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  AccessLogs.init(
    {
      AccessID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      Patient_ID: { type: DataTypes.STRING, allowNull: false },
      User_ID: { type: DataTypes.STRING, allowNull: false },
      Access_Time: { type: DataTypes.STRING, allowNull: false },
      Action: { type: DataTypes.STRING, allowNull: false },
    },
    {
      sequelize,
      modelName: "AccessLogs",
    }
  );
  return AccessLogs;
};
