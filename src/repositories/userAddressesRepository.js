const { userAddress, user } = require("../db/models");

const logger = require("../middleware/logger");
module.exports = {
  async getAllAddresses(options) {
    return userAddress.findAll(options);
  },

  getAddressById(id) {
    const options = {
      include: [{ model: user }],
      where: {},
    };
    if (id) options.where = { id };
    return userAddress.findOne(options);
  },
  async updateAddressById(id, payload) {
    // eslint-disable-next-line no-unused-vars
    const [_, [updatedAddress]] = await userAddress.update(
      { ...payload, updated_at: new Date() },
      // the model is returned when returning:true is specified
      { where: { id }, returning: true }
    );

    return updatedAddress;
  },
  async createUserAddress(payload) {
    const currentDate = new Date();
    const newUserAddress = await userAddress.create({
      ...payload,
      created_at: currentDate,
      updated_at: currentDate,
    });
    return newUserAddress;
  },
};
