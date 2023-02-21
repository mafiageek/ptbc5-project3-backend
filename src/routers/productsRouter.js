const express = require("express");

const productsController = require("../controllers/productsController");
const authMiddleware = require("../middleware/auth");
const isAdmin = require("../middleware/adminAuth");
const productsRouter = express.Router();

productsRouter.get(
  "/",

  productsController.getAllProducts
);
productsRouter.get("/:id", productsController.getOneProductById);

productsRouter.get(
  "/category/:categoryId",
  productsController.getProductsByCategoryId
);
productsRouter.patch(
  "/:id",
  authMiddleware,
  isAdmin,
  productsController.updateProductById
);
productsRouter.post(
  "",
  authMiddleware,
  isAdmin,
  productsController.createProduct
);
productsRouter.delete(
  "/:id",
  authMiddleware,
  isAdmin,
  productsController.deleteProduct
);

module.exports = productsRouter;
