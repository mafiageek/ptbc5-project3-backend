const express = require("express");

const productImagesController = require("../controllers/productImagesController");

const productImagesRouter = express.Router();

productImagesRouter.post(
  "/:productId",
  productImagesController.createProductImage
);

// DELETE /productImages/:ProductImageId
productImagesRouter.delete(
  "/:productImageId",
  productImagesController.deleteProductImage
);

productImagesRouter.patch(
  "/:productImageId",
  productImagesController.updateProductImage
);

module.exports = productImagesRouter;
