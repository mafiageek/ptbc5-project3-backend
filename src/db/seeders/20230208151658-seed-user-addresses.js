"use strict";
const userAddresses = require("./user_addresses.json");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const currentDate = new Date();

    return queryInterface.bulkInsert(
      "user_addresses",
      userAddresses.map(
        ({
          user_id,
          address_line1,
          address_line2,
          city,
          postal,
          country,
          mobile,
        }) => ({
          user_id,
          address_line1,
          address_line2,
          city,
          postal,
          country,
          mobile,
          created_at: currentDate,
          updated_at: currentDate,
        })
      )
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
