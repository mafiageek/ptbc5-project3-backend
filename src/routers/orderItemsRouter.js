const express = require("express");

const orderItemsController = require("../controllers/orderItemsController");

const orderItemsRouter = express.Router();

orderItemsRouter.get("/", orderItemsController.getAllOrderItems);
orderItemsRouter.get("/:id", orderItemsController.getOrderItemById);
orderItemsRouter.post("/", orderItemsController.createOrderItem);
module.exports = orderItemsRouter;
