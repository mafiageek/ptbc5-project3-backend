const { productImage, category } = require("../db/models");
const {
  getAllProducts,
  updateProductById,
  getProductById,
} = require("../repositories/productsRepository");
const { Sequelize, Op } = require("sequelize");
const { SORT_ORDER_HASHMAP } = require("./constants");
module.exports = {
  async getAllProducts({ query }, res) {
    const { name } = query;

    const options = {
      include: [{ model: productImage }, { model: category }],
      where: {},
    };

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
  async updateProductById(req, res) {
    const { id } = req.params;
    console.log(req.body);

    const updatedProduct = await updateProductById(id, req.body);

    return res.json(updatedProduct);
  },
};
