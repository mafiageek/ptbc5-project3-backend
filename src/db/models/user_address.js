'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user_address extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  user_address.init({
    user_id: DataTypes.INTEGER,
    address_line1: DataTypes.STRING,
    address_line2: DataTypes.STRING,
    city: DataTypes.STRING,
    postal: DataTypes.STRING,
    country: DataTypes.STRING,
    mobile: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'user_address',
    underscored: true,
  });
  return user_address;
};