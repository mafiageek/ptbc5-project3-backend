const { orderItem, product, order } = require("../db/models");

const logger = require("../middleware/logger");
module.exports = {
  getAllOrderItems(options) {
    return orderItem.findAll(options);
  },
  getOrderItemById(id) {
    const options = {
      include: [{ model: product }, { model: order }],
      where: {},
    };
    if (id) options.where = { id };
    return orderItem.findOne(options);
  },
  async createOrderItem(payload) {
    const currentDate = new Date();

    const newOrderItem = await orderItem.create({
      ...payload,
      created_at: currentDate,
      updated_at: currentDate,
    });

    return newOrderItem;
  },
};
