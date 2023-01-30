const express = require("express");

const productsController = require("../controllers/productsController");

const productsRouter = express.Router();

productsRouter.get("/", productsController.getAllProducts);
productsRouter.patch("/:id", productsController.updateProductById);

module.exports = productsRouter;
