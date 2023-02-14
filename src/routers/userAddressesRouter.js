const express = require("express");

const userAddressesController = require("../controllers/userAddressesController");

const userAddressesRouter = express.Router();

userAddressesRouter.get("/", userAddressesController.getAllAddresses);
userAddressesRouter.get("/:id", userAddressesController.getAddressById);
userAddressesRouter.patch("/:id", userAddressesController.updateAddressById);
userAddressesRouter.post("", userAddressesController.createUserAddress);
module.exports = userAddressesRouter;
