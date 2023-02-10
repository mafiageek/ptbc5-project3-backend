"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class productImage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.product);
    }
  }
  productImage.init(
    {
      urlString: DataTypes.STRING,
      productId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "productImage",
      underscored: true,
    }
  );
  return productImage;
};
