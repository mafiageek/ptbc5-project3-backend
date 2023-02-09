"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class userAddress extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.user);
    }
  }
  userAddress.init(
    {
      userId: DataTypes.INTEGER,
      addressLine1: DataTypes.STRING,
      addressLine2: DataTypes.STRING,
      city: DataTypes.STRING,
      postal: DataTypes.STRING,
      country: DataTypes.STRING,
      mobile: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "userAddress",
      underscored: true,
    }
  );
  return userAddress;
};
