'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Medical_Records', {

      Record_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Patient_ID: {
        type: Sequelize.STRING
      },
      Diagnosis: {
        type: Sequelize.STRING
      },
      Treatment_Plan: {
        type: Sequelize.STRING
      },
      Prescription: {
        type: Sequelize.STRING
      },
      Doctor_Notes: {
        type: Sequelize.STRING
      },
      Date_of_Visit: {
        type: Sequelize.DATE
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
    await queryInterface.dropTable('Medical_Records');
  }
};