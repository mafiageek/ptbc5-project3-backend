const {
  order,
  orderItem,
  product,
  userAddress,
  user,
} = require("../db/models");

const logger = require("../middleware/logger");
module.exports = {
  getAllOrders(options) {
    return order.findAll(options);
  },
  getOrderById(id) {
    const options = {
      include: [
        { model: orderItem, include: { model: product } },
        { model: userAddress },
        { model: user },
      ],
      where: {},
    };
    if (id) options.where = { id };
    return order.findOne(options);
  },
  async updateOrderById(id, payload) {
    // eslint-disable-next-line no-unused-vars
    const [_, [updatedOrder]] = await order.update(
      { ...payload, updated_at: new Date() },
      // the model is returned when returning:true is specified
      { where: { id }, returning: true }
    );

    return updatedOrder;
  },
};
