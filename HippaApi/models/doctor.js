'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Doctor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Doctor.init({
    Doctor_Id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    FirstName:  {
      type: DataTypes.STRING,
      allowNull: false
    },
    LastName:  {
      type: DataTypes.STRING,
      allowNull: false
    },
    Speciality:  {
      type: DataTypes.STRING,
      allowNull: false
    },
    Phn_Number:  {
      type: DataTypes.STRING,
      allowNull: false
    },
    Email:  {
      type: DataTypes.STRING,
      allowNull: false
    },
    License_no:  {
      type: DataTypes.STRING,
      allowNull: false
    },
    NPI_no:  {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Doctor',
  });
  return Doctor;
};