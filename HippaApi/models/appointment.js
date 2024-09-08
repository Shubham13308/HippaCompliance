'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Appointment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Appointment.init({
    Appointment_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    Patient_ID: {type:DataTypes.STRING,allowNull:false},
    Doctor_Id: {type:DataTypes.STRING,allowNull:false},
    Appointment_Date: {type:DataTypes.DATE,allowNull:false},
    ReasonForVisit: {type:DataTypes.STRING,allowNull:false}
  }, {
    sequelize,
    modelName: 'Appointment',
  });
  return Appointment;
};