const express = require("express");

const ordersController = require("../controllers/ordersController");

const ordersRouter = express.Router();

ordersRouter.get("/", ordersController.getAllOrders);
ordersRouter.get("/:id", ordersController.getOrderById);
// ordersRouter.patch("/:id", ordersController.updateOrderById);
// ordersRouter.post("", ordersController.createOrder);
module.exports = ordersRouter;
