require("express-async-errors");
const express = require("express");
const productsRouter = require("./productsRouter");

const appRouter = express.Router();

appRouter.use("/products", productsRouter);

module.exports = appRouter;
