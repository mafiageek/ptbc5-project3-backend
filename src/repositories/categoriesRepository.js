const { product, productImage, category } = require("../db/models");

const logger = require("../middleware/logger");
module.exports = {
  getAllCategories() {
    return category.findAll();
  },

  getCategoryByCategoryId(categoryId) {
    const options = {};
    if (categoryId) options.where = { id: categoryId };
    return category.findOne(options);
  },
  async updateCategoryByCategoryId(categoryId, payload) {
    // eslint-disable-next-line no-unused-vars
    const [_, [updatedCategory]] = await category.update(
      { ...payload, updated_at: new Date() },
      // the model is returned when returning:true is specified
      { where: { id: categoryId }, returning: true }
    );

    return updatedCategory;
  },
  async createCategory(payload) {
    const currentDate = new Date();

    const newCategory = await category.create({
      ...payload,
      created_at: currentDate,
      updated_at: currentDate,
    });

    return newCategory;
  },
};
