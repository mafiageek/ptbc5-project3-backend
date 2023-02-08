const { user, userAddress } = require("../db/models");
const {
  getAllUsers,
  getUserById,

  createUser,
} = require("../repositories/usersRepository");

module.exports = {
  async getAllUsers({ query }, res) {
    const { role } = query;

    const options = {
      include: [{ model: userAddress }],
      where: {},
    };

    if ((role && role == "user") || role == "admin") {
      options.where.role = role;
    }
    const users = await getAllUsers(options);

    return res.json(users);
  },
  async getUserById(req, res) {
    const { id } = req.params;
    // +id converts a string to number
    if (isNaN(id) || +id > Number.MAX_SAFE_INTEGER || +id < 0) {
      const error = new Error("id  must be a valid number");
      error.status = 400;
      throw error;
    }

    const user = await getUserById(id);

    if (!user) {
      const error = new Error(`Could not find user with id ${id}`);
      error.status = 400;
      throw error;
    }

    return res.json(user);
  },
  async createUser(req, res) {
    const newUser = await createUser({ ...req.body });

    return res.json(newUser);
  },
};
