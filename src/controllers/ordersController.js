const { user, userAddress, product, orderItem } = require("../db/models");
const {
  getAllOrders,
  getOrderById,
} = require("../repositories/ordersRepository");

module.exports = {
  async getAllOrders(req, res) {
    const options = {
      include: [
        { model: orderItem, include: { model: product } },
        { model: userAddress },
        { model: user },
      ],
      where: {},
    };
    const orders = await getAllOrders(options);

    return res.json(orders);
  },
  async getOrderById(req, res) {
    const { id } = req.params;
    // +id converts a string to number
    if (isNaN(id) || +id > Number.MAX_SAFE_INTEGER || +id < 0) {
      const error = new Error("id  must be a valid number");
      error.status = 400;
      throw error;
    }

    const order = await getOrderById(id);

    if (!order) {
      const error = new Error(`Could not find order with id ${id}`);
      error.status = 400;
      throw error;
    }

    return res.json(order);
  },
};
