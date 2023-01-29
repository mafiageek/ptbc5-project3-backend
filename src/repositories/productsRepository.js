const { product } = require("../db/models");

module.exports = {
  getAllProducts() {
    return product.findAll();
  },
};
