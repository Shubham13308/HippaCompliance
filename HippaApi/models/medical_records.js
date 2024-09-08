'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Medical_Records extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Medical_Records.belongsTo(models.Patient, {
        foreignKey: 'Patient_ID',
        as: 'patient'
    });
    }
  }
  Medical_Records.init({
    Record_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    Patient_ID: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Diagnosis: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Treatment_Plan: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Prescription: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Doctor_Notes: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Date_of_Visit: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Medical_Records',
  });
  return Medical_Records;
};