const {
  getAllCategories,
  getCategoryById,
  updateCategoryById,
  createCategory,
  deleteCategory,
} = require("../repositories/categoriesRepository");
const { Sequelize, Op } = require("sequelize");
const { SORT_ORDER_HASHMAP } = require("./constants");
module.exports = {
  async getAllCategories(req, res) {
    //if (name) options.where.name = { [Op.substring]: name };

    const categories = await getAllCategories();

    return res.json(categories);
  },
  async getCategoryById(req, res) {
    const { id } = req.params;

    // +id converts a string to number
    if (isNaN(id) || +id > Number.MAX_SAFE_INTEGER || +id < 0) {
      const error = new Error("Category Id must be a valid number");
      error.status = 400;
      throw error;
    }

    const category = await getCategoryById(id);
    if (!category) {
      const error = new Error(`Could not find category with category id ${id}`);
      error.status = 400;
      throw error;
    }

    return res.json(category);
  },
  async updateCategoryById(req, res) {
    const { id } = req.params;
    // +id converts a string to number
    if (isNaN(id) || +id > Number.MAX_SAFE_INTEGER || +id < 0) {
      const error = new Error("Category Id must be a valid number");
      error.status = 400;
      throw error;
    }
    const updatedCategory = await updateCategoryById(id, req.body);
    return res.json(updatedCategory);
  },
  async createCategory(req, res) {
    const newCategory = await createCategory({ ...req.body });

    return res.json(newCategory);
  },
  async deleteCategory(req, res) {
    const { id } = req.params;
    // +id converts a string to number
    if (isNaN(id) || +id > Number.MAX_SAFE_INTEGER || +id < 0) {
      const error = new Error("Category Id must be a valid number");
      error.status = 400;
      throw error;
    }
    const deleteResult = await deleteCategory(id);

    if (!deleteResult) {
      const error = new Error(`Could not delete category with id ${id}`);
      error.status = 400;
      throw error;
    }
    res.json({ success: true });
  },
};
