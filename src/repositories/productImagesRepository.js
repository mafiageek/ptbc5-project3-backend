const { productImage } = require("../db/models");

module.exports = {
  async createProductImage(payload) {
    const currentDate = new Date();

    return productImage.create({
      ...payload,
      created_at: currentDate,
      updated_at: currentDate,
    });
  },

  deleteProductImage(productImageId) {
    return productImage.destroy({
      where: {
        id: productImageId,
      },
    });
  },

  updateProductImage(productImageId, payload) {
    return productImage.update(
      { ...payload, update_at: new Date() },
      {
        where: {
          id: productImageId,
        },
      }
    );
  },
};
