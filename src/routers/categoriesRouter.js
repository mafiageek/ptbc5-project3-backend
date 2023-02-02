const express = require("express");

const categoriesController = require("../controllers/categoriesController");

const categoriesRouter = express.Router();

categoriesRouter.get("/", categoriesController.getAllCategories);

categoriesRouter.get(
  "/:categoryId",
  categoriesController.getCategoryByCategoryId
);
categoriesRouter.patch(
  "/:categoryId",
  categoriesController.updateCategoryByCategoryId
);
categoriesRouter.post("/createcategory", categoriesController.createCategory);
module.exports = categoriesRouter;
