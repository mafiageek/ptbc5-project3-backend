const express = require("express");
const authMiddleware = require("../middleware/auth");
const ordersController = require("../controllers/ordersController");

const ordersRouter = express.Router();

ordersRouter.get("/token", ordersController.getToken);
ordersRouter.post("/payment", ordersController.processPayment);
ordersRouter.get("/", authMiddleware, ordersController.getAllOrders);
ordersRouter.get("/:id", authMiddleware, ordersController.getOrderById);
ordersRouter.get(
  "/user/:userId",
  authMiddleware,
  ordersController.getOrdersByUserId
);
ordersRouter.patch("/:id", authMiddleware, ordersController.updateOrderById);
ordersRouter.post("", authMiddleware, ordersController.createOrder);
module.exports = ordersRouter;
