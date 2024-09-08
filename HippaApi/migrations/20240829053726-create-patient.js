'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Patients', {

      Patient_ID: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      FirstName: {
        type: Sequelize.STRING
      },
      LastName: {
        type: Sequelize.STRING
      },
      DOB: {
        type: Sequelize.DATE
      },
      Gender: {
        type: Sequelize.STRING
      },
      Address: {
        type: Sequelize.STRING
      },
      City: {
        type: Sequelize.STRING
      },
      State: {
        type: Sequelize.STRING
      },
      Zipcode: {
        type: Sequelize.STRING
      },
      Phn_number: {
        type: Sequelize.STRING
      },
      Email: {
        type: Sequelize.STRING
      },
      Insurance_provider: {
        type: Sequelize.STRING
      },
      IncPolicyNumber: {
        type: Sequelize.STRING
      },
      EmergencyContactName: {
        type: Sequelize.STRING
      },
      EmergencyContactNumber: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Patients');
  }
};