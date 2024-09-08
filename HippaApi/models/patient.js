"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Patient extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Patient.hasMany(models.Medical_Records, {
        foreignKey: 'Patient_ID',
        as: 'medicalRecords'
    });
      Patient.hasMany(models.Appointment,{
        foreignKey:'Patient_ID',
        as:'appointments'
      })
    }
  }
  Patient.init(
    {
      Patient_ID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      FirstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      LastName: { type: DataTypes.STRING, allowNull: false },
      DOB: { type: DataTypes.STRING, allowNull: false },
      Gender: { type: DataTypes.STRING, allowNull: false },
      Address: { type: DataTypes.STRING, allowNull: false },
      City: { type: DataTypes.STRING, allowNull: false },
      State: { type: DataTypes.STRING, allowNull: false },
      Zipcode: { type: DataTypes.STRING, allowNull: false },
      Phn_number: { type: DataTypes.STRING, allowNull: false },
      Email: { type: DataTypes.STRING, allowNull: false },
      Insurance_provider: { type: DataTypes.STRING, allowNull: false },
      IncPolicyNumber: { type: DataTypes.STRING, allowNull: false },
      EmergencyContactName: { type: DataTypes.STRING, allowNull: false },
      EmergencyContactNumber: { type: DataTypes.STRING, allowNull: false },
    },
    {
      sequelize,
      modelName: "Patient",
    }
  );
  return Patient;
};
