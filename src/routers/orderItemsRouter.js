const express = require("express");

const orderItemsController = require("../controllers/orderItemsController");
const authMiddleware = require("../middleware/auth");
const orderItemsRouter = express.Router();

orderItemsRouter.get("/", orderItemsController.getAllOrderItems);
orderItemsRouter.get("/:id", orderItemsController.getOrderItemById);
orderItemsRouter.post(
  "/",
  authMiddleware,
  orderItemsController.createOrderItem
);
module.exports = orderItemsRouter;
