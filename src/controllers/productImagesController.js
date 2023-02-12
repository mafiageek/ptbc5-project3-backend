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
    const { id } = req.params;
    const deleteResult = await deleteProductImage(id);

    if (!deleteResult) {
      const error = new Error(`Could not delete product Image with ID ${id}`);
      error.status = 400;
      throw error;
    }

    res.json({ success: true });
  },

  async updateProductImage(req, res) {
    const { id } = req.params;
    // +id converts a string to number
    if (isNaN(id) || +id > Number.MAX_SAFE_INTEGER || +id < 0) {
      const error = new Error("id  must be a valid number");
      error.status = 400;
      throw error;
    }
    const updateResult = await updateProductImage(id, req.body);

    if (!updateResult) {
      const error = new Error(`Could not update product image with ID ${id}`);
      error.status = 400;
      throw error;
    }
    res.json({ success: true });
  },
};
