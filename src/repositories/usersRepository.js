const { user } = require("../db/models");

const logger = require("../middleware/logger");
module.exports = {
  getAllUsers(options) {
    return user.findAll(options);
  },

  getUserById(id) {
    const options = {
      // attributes: {
      //   include: [
      //     [Sequelize.fn("COUNT", Sequelize.col("likes.id")), "likesCount"],
      //   ],
      // },
      // group: ["like.id"],
    };
    if (id) options.where = { id };
    return user.findOne(options);
  },

  async createUser(payload) {
    const currentDate = new Date();
    const newUser = await user.create({
      ...payload,
      created_at: currentDate,
      updated_at: currentDate,
    });
    return newUser;
  },
};
