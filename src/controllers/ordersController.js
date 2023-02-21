const { user, userAddress, product, orderItem } = require("../db/models");
const braintree = require("braintree");
const {
  getAllOrders,
  getOrderById,
  getOrdersByUserId,
  updateOrderById,
  createOrder,
} = require("../repositories/ordersRepository");

const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});

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
  async getOrdersByUserId(req, res) {
    const { userId } = req.params;
    // +userId converts a string to number
    if (isNaN(userId) || +userId > Number.MAX_SAFE_INTEGER || +userId < 0) {
      const error = new Error("User id  must be a valid number");
      error.status = 400;
      throw error;
    }

    const orders = await getOrdersByUserId(userId);

    if (!orders) {
      const error = new Error(`Could not find order with user id ${userId}`);
      error.status = 400;
      throw error;
    }

    return res.json(orders);
  },
  async updateOrderById(req, res) {
    const { id } = req.params;
    if (isNaN(id) || +id > Number.MAX_SAFE_INTEGER || +id < 0) {
      const error = new Error("id  must be a valid number");
      error.status = 400;
      throw error;
    }
    const updatedOrder = await updateOrderById(id, req.body);
    return res.json(updatedOrder);
  },
  async createOrder(req, res) {
    const newOrder = await createOrder({ ...req.body });

    return res.json(newOrder);
  },

  async getToken(req, res) {
    try {
      gateway.clientToken.generate({}, function (err, response) {
        if (err) {
          res.status(500).send(err);
        } else {
          res.send(response);
        }
      });
    } catch (err) {
      console.log(err);
    }
  },

  async processPayment(req, res) {
    try {
      // console.log(req.body);
      const { nonce, cart } = req.body;

      let total = 0;
      cart.map((i) => {
        total += i.price;
      });
      // console.log("total => ", total);

      let newTransaction = gateway.transaction.sale({
        amount: total,
        paymentMethodNonce: nonce,
        options: {
          submitForSettlement: true,
        },
      });
      res.json({ ok: true });
    } catch (err) {
      console.log(err);
    }
  },
};
