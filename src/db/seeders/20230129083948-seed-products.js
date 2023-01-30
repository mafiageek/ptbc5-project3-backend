"use strict";
const products = require("./products.json");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const currentDate = new Date();

    return queryInterface.bulkInsert(
      "products",
      products.map(({ name, brand, description, price, stock }) => ({
        name: name,
        brand: brand,
        description: description,
        price: price,
        stock: stock,
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
