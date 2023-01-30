const { product } = require("../db/models");
const logger = require("../middleware/logger");

module.exports = {
  getAllProducts(options) {
    return product.findAll(options);
  },
  async updateProductById(id, payload) {
    // eslint-disable-next-line no-unused-vars
    const [_, [updatedProduct]] = await product.update(
      { ...payload, updated_at: new Date() },
      // the model is returned when returning:true is specified
      { where: { id }, returning: true }
    );

    return updatedProduct;
  },
};
