const express = require("express");

const userAddressesController = require("../controllers/userAddressesController");
const authMiddleware = require("../middleware/auth");
const userAddressesRouter = express.Router();

userAddressesRouter.get("/", userAddressesController.getAllAddresses);
userAddressesRouter.get("/:id", userAddressesController.getAddressById);
userAddressesRouter.patch(
  "/:id",
  authMiddleware,
  userAddressesController.updateAddressById
);
userAddressesRouter.post(
  "",
  authMiddleware,
  userAddressesController.createUserAddress
);
module.exports = userAddressesRouter;
