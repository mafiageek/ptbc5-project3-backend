const {
  getAllCategories,
  getCategoryByCategoryId,
  updateCategoryByCategoryId,
  createCategory,
} = require("../repositories/categoriesRepository");
const { Sequelize, Op } = require("sequelize");
const { SORT_ORDER_HASHMAP } = require("./constants");
module.exports = {
  async getAllCategories(req, res) {
    //if (name) options.where.name = { [Op.substring]: name };

    const categories = await getAllCategories();

    return res.json(categories);
  },
  async getCategoryByCategoryId(req, res) {
    const { categoryId } = req.params;

    // +id converts a string to number
    if (
      isNaN(categoryId) ||
      +categoryId > Number.MAX_SAFE_INTEGER ||
      +categoryId < 0
    ) {
      const error = new Error("Category Id must be a valid number");
      error.status = 400;
      throw error;
    }

    const category = await getCategoryByCategoryId(categoryId);
    if (!category) {
      const error = new Error(
        `Could not find category with category id ${categoryId}`
      );
      error.status = 400;
      throw error;
    }

    return res.json(category);
  },
  async updateCategoryByCategoryId(req, res) {
    const { categoryId } = req.params;
    const updatedCategory = await updateCategoryByCategoryId(
      categoryId,
      req.body
    );
    return res.json(updatedCategory);
  },
  async createCategory(req, res) {
    const newCategory = await createCategory({ ...req.body });

    return res.json(newCategory);
  },
};
