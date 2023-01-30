require("express-async-errors");
const express = require("express");
const productsRouter = require("./productsRouter");
const productImagesRouter = require("./productImagesRouter");
const appRouter = express.Router();

appRouter.use("/products", productsRouter);
appRouter.use("/images", productImagesRouter);
module.exports = appRouter;
