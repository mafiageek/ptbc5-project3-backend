const { product, productImage, category } = require("../db/models");

const logger = require("../middleware/logger");

module.exports = {
  getAllProducts(options) {
    return product.findAll(options);
  },
  getProductById(id) {
    const options = {
      include: [{ model: productImage }, { model: category }],
    };
    if (id) options.where = { id };
    return product.findOne(options);
  },
  getProductsByCategoryId(categoryId) {
    const options = {
      include: [{ model: productImage }, { model: category }],
    };
    if (categoryId) options.where = { category_id: categoryId };
    return product.findOne(options);
  },
  async updateProductById(id, payload) {
    // eslint-disable-next-line no-unused-vars
    const [_, [updatedProduct]] = await product.update(
      { ...payload, updated_at: new Date() },
      // the model is returned when returning:true is specified
      { where: { id }, returning: true }
    );

    return updatedProduct;
  },
  async createProduct(payload) {
    const currentDate = new Date();
    const { url_string, ...rest } = payload;

    const newProduct = await product.create({
      ...rest,
      created_at: currentDate,
      updated_at: currentDate,
    });
    const newProductJson = newProduct.toJSON();
    const newProductImage = await productImage.create({
      url_string: url_string,
      product_id: newProduct.id,
      created_at: currentDate,
      updated_at: currentDate,
    });

    const response = { ...newProductJson, productImages: [newProductImage] };

    return response;
  },
};
