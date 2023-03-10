const { productImage, category } = require("../db/models");
const {
  getAllProducts,
  updateProductById,
  getProductById,
  getProductsByCategoryId,
  createProduct,
  deleteProduct,
} = require("../repositories/productsRepository");
const { Sequelize, Op } = require("sequelize");
const { checkAdmin } = require("./constants");
module.exports = {
  async getAllProducts(req, res) {
    const { name, categoryName } = req.query;

    const options = {
      include: [{ model: productImage }, { model: category }],
      where: {},
    };

    if (categoryName)
      options.include[1].where = { category_name: categoryName };

    //if (name) options.where.name = { [Op.substring]: name };
    if (name)
      options.where.name = Sequelize.where(
        Sequelize.fn("LOWER", Sequelize.col("name")),
        "LIKE",
        `%${name.toLowerCase()}%`
      );

    const products = await getAllProducts(options);

    return res.json(products);
  },
  async getOneProductById(req, res) {
    const { id } = req.params;
    // +id converts a string to number
    if (isNaN(id) || +id > Number.MAX_SAFE_INTEGER || +id < 0) {
      const error = new Error("id  must be a valid number");
      error.status = 400;
      throw error;
    }

    const product = await getProductById(id);

    if (!product) {
      const error = new Error(`Could not find product with id ${id}`);
      error.status = 400;
      throw error;
    }

    return res.json(product);
  },
  async getProductsByCategoryId(req, res) {
    const { categoryId } = req.params;
    // +id converts a string to number
    if (
      isNaN(categoryId) ||
      +categoryId > Number.MAX_SAFE_INTEGER ||
      +categoryId < 0
    ) {
      const error = new Error("category id  must be a valid number");
      error.status = 400;
      throw error;
    }

    const products = await getProductsByCategoryId(categoryId);

    if (!products) {
      const error = new Error(
        `Could not find any products with category id ${categoryId}`
      );
      error.status = 400;
      throw error;
    }

    return res.json(products);
  },
  async updateProductById(req, res) {
    if (!checkAdmin(req.email)) {
      const error = new Error("Please log in as admin.");
      error.status = 400;
      throw error;
    }
    const { id } = req.params;
    if (isNaN(id) || +id > Number.MAX_SAFE_INTEGER || +id < 0) {
      const error = new Error("id  must be a valid number");
      error.status = 400;
      throw error;
    }
    const updatedProduct = await updateProductById(id, req.body);

    return res.json(updatedProduct);
  },

  async createProduct(req, res) {
    if (!checkAdmin(req.email)) {
      const error = new Error("Please log in as admin.");
      error.status = 400;
      throw error;
    }
    const newProduct = await createProduct({ ...req.body });

    return res.json(newProduct);
  },
  async deleteProduct(req, res) {
    if (!checkAdmin(req.email)) {
      const error = new Error("Please log in as admin.");
      error.status = 400;
      throw error;
    }
    const { id } = req.params;
    const deleteResult = await deleteProduct(id);

    if (!deleteResult) {
      const error = new Error(`Could not delete product with product ID ${id}`);
      error.status = 400;
      throw error;
    }

    res.json({ success: true });
  },
};
