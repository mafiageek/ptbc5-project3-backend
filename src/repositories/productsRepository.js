const { product } = require("../db/models");

module.exports = {
  getAllProducts(options) {
    return product.findAll(options);
  },
};
