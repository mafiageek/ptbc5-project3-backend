const { user } = require("../db/models");

module.exports = {
  SORT_ORDER_HASHMAP: {
    ascend: "ASC",
    descend: "DESC",
  },

  validURL(str) {
    var pattern = new RegExp(
      "^(https?:\\/\\/)?" + // protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$",
      "i"
    ); // fragment locator
    return !!pattern.test(str);
  },

  async checkAdmin(email) {
    const options = {
      where: {},
    };
    if (email) options.where = { email };
    const returnedUser = await user.findOne(options);
    return returnedUser.toJSON().role == "admin";
  },
};
