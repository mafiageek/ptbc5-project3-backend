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

  deleteProductImage(id) {
    return productImage.destroy({
      where: {
        id: id,
      },
    });
  },

  deleteProductImageByProductId(productId) {
    return productImage.destroy({
      where: {
        productId: productId,
      },
    });
  },
  updateProductImage(id, payload) {
    return productImage.update(
      { ...payload, update_at: new Date() },
      {
        where: {
          id: id,
        },
      }
    );
  },
};
