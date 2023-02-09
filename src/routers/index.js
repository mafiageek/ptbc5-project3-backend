require("express-async-errors");
const express = require("express");
const productsRouter = require("./productsRouter");
const productImagesRouter = require("./productImagesRouter");
const categoriesRouter = require("./categoriesRouter");
const usersRouter = require("./usersRouter");
const userAddressesRouter = require("./userAddressesRouter");
const appRouter = express.Router();

appRouter.use("/products", productsRouter);
appRouter.use("/images", productImagesRouter);
appRouter.use("/categories", categoriesRouter);
appRouter.use("/users", usersRouter);
appRouter.use("/addresses", userAddressesRouter);
module.exports = appRouter;
