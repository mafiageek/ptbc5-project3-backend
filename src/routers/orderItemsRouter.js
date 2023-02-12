const express = require("express");

const orderItemsController = require("../controllers/orderItemsController");

const orderItemsRouter = express.Router();

orderItemsRouter.get("/", orderItemsController.getAllOrderItems);
orderItemsRouter.get("/:id", orderItemsController.getOrderItemById);
// ordersRouter.patch("/:id", ordersController.updateOrderById);
// ordersRouter.post("", ordersController.createOrder);
module.exports = orderItemsRouter;
