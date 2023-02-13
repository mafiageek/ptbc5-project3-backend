const { user } = require("../db/models");

const {
  getAllAddresses,
  getAddressById,
  updateAddressById,
  createUserAddress,
} = require("../repositories/userAddressesRepository");

module.exports = {
  async getAllAddresses({ query }, res) {
    const { userId, email, uid } = query;

    const options = {
      include: [{ model: user, where: {} }],
      where: {},
    };

    if ((userId && uid) || (userId && email) || (uid && email)) {
      const error = new Error(
        "Please input either userId, email or uid. Do not stack these query parameters"
      );
      error.status = 400;
      throw error;
    }

    if (userId) {
      options.where.userId = userId;
    }
    if (email) {
      options.include[0].where.email = email;
    }
    if (uid) {
      options.include[0].where.uid = uid;
    }

    const userAddresses = await getAllAddresses(options);

    return res.json(userAddresses);
  },
  async getAddressById(req, res) {
    const { id } = req.params;
    // +id converts a string to number
    if (isNaN(id) || +id > Number.MAX_SAFE_INTEGER || +id < 0) {
      const error = new Error("id  must be a valid number");
      error.status = 400;
      throw error;
    }

    const userAddress = await getAddressById(id);

    if (!userAddress) {
      const error = new Error(`Could not find any address with id ${id}`);
      error.status = 400;
      throw error;
    }

    return res.json(userAddress);
  },
  async updateAddressById(req, res) {
    const { id } = req.params;
    if (isNaN(id) || +id > Number.MAX_SAFE_INTEGER || +id < 0) {
      const error = new Error("id  must be a valid number");
      error.status = 400;
      throw error;
    }
    const updatedAddress = await updateAddressById(id, req.body);
    return res.json(updatedAddress);
  },
  async createUserAddress(req, res) {
    const newUserAddress = await createUserAddress({ ...req.body });

    return res.json(newUserAddress);
  },
};
