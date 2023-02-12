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
};
