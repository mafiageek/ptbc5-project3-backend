const express = require("express");

const ordersController = require("../controllers/ordersController");

const ordersRouter = express.Router();

ordersRouter.get("/token", ordersController.getToken);
ordersRouter.post("/payment", ordersController.processPayment);
ordersRouter.get("/", ordersController.getAllOrders);
ordersRouter.get("/:id", ordersController.getOrderById);
ordersRouter.get("/user/:userId", ordersController.getOrdersByUserId);
ordersRouter.patch("/:id", ordersController.updateOrderById);
ordersRouter.post("", ordersController.createOrder);
module.exports = ordersRouter;
