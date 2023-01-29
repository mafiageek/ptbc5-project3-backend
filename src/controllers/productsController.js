const { getAllProducts } = require("../repositories/productsRepository");

const { SORT_ORDER_HASHMAP } = require("./constants");
module.exports = {
  async getAllProducts(req, res) {
    const products = await getAllProducts();

    return res.json(products);
  },
};
