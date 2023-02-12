const express = require("express");

const productsController = require("../controllers/productsController");

const productsRouter = express.Router();

productsRouter.get("/", productsController.getAllProducts);
productsRouter.get("/:id", productsController.getOneProductById);

productsRouter.get(
  "/category/:categoryId",
  productsController.getProductsByCategoryId
);
productsRouter.patch("/:id", productsController.updateProductById);
productsRouter.post("", productsController.createProduct);
productsRouter.delete("/:id", productsController.deleteProduct);

module.exports = productsRouter;
