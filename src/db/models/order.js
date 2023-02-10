"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.user);
      this.belongsTo(models.userAddress);
    }
  }
  order.init(
    {
      user_id: DataTypes.INTEGER,
      address_id: DataTypes.INTEGER,
      total: DataTypes.DECIMAL,
      order_status: DataTypes.ENUM("paid", "shipped", "received", "reviewed"),
    },
    {
      sequelize,
      modelName: "order",
      underscored: true,
    }
  );
  return order;
};
