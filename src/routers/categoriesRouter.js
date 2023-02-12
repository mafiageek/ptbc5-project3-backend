const express = require("express");

const categoriesController = require("../controllers/categoriesController");

const categoriesRouter = express.Router();

categoriesRouter.get("/", categoriesController.getAllCategories);

categoriesRouter.get("/:id", categoriesController.getCategoryById);
categoriesRouter.patch("/:id", categoriesController.updateCategoryById);
categoriesRouter.post("/", categoriesController.createCategory);
categoriesRouter.delete("/:id", categoriesController.deleteCategory);
module.exports = categoriesRouter;
