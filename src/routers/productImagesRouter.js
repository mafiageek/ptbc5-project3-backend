const express = require("express");

const productImagesController = require("../controllers/productImagesController");
const authMiddleWare = require("../middleware/auth");
const productImagesRouter = express.Router();

productImagesRouter.post(
  "/:productId",
  productImagesController.createProductImage
);

productImagesRouter.delete("/:id", productImagesController.deleteProductImage);

productImagesRouter.patch("/:id", productImagesController.updateProductImage);

module.exports = productImagesRouter;
