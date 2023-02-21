const express = require("express");

const categoriesController = require("../controllers/categoriesController");
const authMiddleware = require("../middleware/auth");
const isAdmin = require("../middleware/adminAuth");
const categoriesRouter = express.Router();

categoriesRouter.get("/", categoriesController.getAllCategories);

categoriesRouter.get("/:id", categoriesController.getCategoryById);
categoriesRouter.patch(
  "/:id",
  authMiddleware,
  isAdmin,
  categoriesController.updateCategoryById
);
categoriesRouter.post(
  "/",
  authMiddleware,
  isAdmin,
  categoriesController.createCategory
);
categoriesRouter.delete(
  "/:id",
  authMiddleware,
  isAdmin,
  categoriesController.deleteCategory
);
module.exports = categoriesRouter;
