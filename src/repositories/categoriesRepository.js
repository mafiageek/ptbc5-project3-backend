const { product, productImage, category } = require("../db/models");

const logger = require("../middleware/logger");
module.exports = {
  getAllCategories() {
    return category.findAll();
  },

  getCategoryById(id) {
    const options = {};
    if (id) options.where = { id: id };
    return category.findOne(options);
  },
  async updateCategoryById(id, payload) {
    // eslint-disable-next-line no-unused-vars
    const [_, [updatedCategory]] = await category.update(
      { ...payload, updated_at: new Date() },
      // the model is returned when returning:true is specified
      { where: { id: id }, returning: true }
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
  deleteCategory(id) {
    return category.destroy({
      where: { id: id },
    });
  },
};
