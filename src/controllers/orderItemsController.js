const { order, product } = require("../db/models");
const {
  getAllOrderItems,
  getOrderItemById,
  createOrderItem,
} = require("../repositories/orderItemsRepository");

module.exports = {
  async getAllOrderItems(req, res) {
    const options = {
      include: [{ model: product }, { model: order }],
      where: {},
    };
    const orderItems = await getAllOrderItems(options);

    return res.json(orderItems);
  },
  async getOrderItemById(req, res) {
    const { id } = req.params;
    // +id converts a string to number
    if (isNaN(id) || +id > Number.MAX_SAFE_INTEGER || +id < 0) {
      const error = new Error("id  must be a valid number");
      error.status = 400;
      throw error;
    }

    const orderItem = await getOrderItemById(id);

    if (!orderItem) {
      const error = new Error(`Could not find order item with id ${id}`);
      error.status = 400;
      throw error;
    }

    return res.json(orderItem);
  },
  async createOrderItem(req, res) {
    const newOrderItem = await createOrderItem({ ...req.body });

    return res.json(newOrderItem);
  },
};
