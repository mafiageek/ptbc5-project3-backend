"use strict";
const orders = require("./orders.json");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const currentDate = new Date();

    return queryInterface.bulkInsert(
      "orders",
      orders.map(({ user_id, address_id, total, order_status }) => ({
        user_id,
        address_id,
        total,
        order_status,
        created_at: currentDate,
        updated_at: currentDate,
      }))
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
