const {
  createProductImage,
  deleteProductImage,
  updateProductImage,
} = require("../repositories/productImagesRepository");
const { Sequelize, Op } = require("sequelize");
const { SORT_ORDER_HASHMAP } = require("./constants");
module.exports = {
  async createProductImage(req, res) {
    const newProductImage = await createProductImage({
      ...req.body,
      productId: req.params.productId,
    });
    res.json(newProductImage);
  },

  async deleteProductImage(req, res) {
    const { productImageId } = req.params;
    const deleteResult = await deleteProductImage(productImageId);

    if (!deleteResult) {
      const error = new Error(
        `Could not delete product Image with product image ID ${productImageId}`
      );
      error.status = 400;
      throw error;
    }

    res.json({ success: true });
  },

  async updateProductImage(req, res) {
    const { productImageId } = req.params;
    const updateResult = await updateProductImage(productImageId, req.body);

    if (!updateResult) {
      const error = new Error(
        `Could not update product image with product image ID ${productImageId}`
      );
      error.status = 400;
      throw error;
    }
    res.json({ success: true });
  },
};
