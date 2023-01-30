const {
  getAllProducts,
  updateProductById,
} = require("../repositories/productsRepository");
const { Sequelize, Op } = require("sequelize");
const { SORT_ORDER_HASHMAP } = require("./constants");
module.exports = {
  async getAllProducts({ query }, res) {
    const { name } = query;

    const options = {
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
  async updateProductById(req, res) {
    const { id } = req.params;
    console.log(req.body);

    const updatedProduct = await updateProductById(id, req.body);

    return res.json(updatedProduct);
  },
};
