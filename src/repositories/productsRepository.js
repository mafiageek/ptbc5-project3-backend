const { validURL } = require("../controllers/constants");
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
    const { productImageId, urlString, ...rest } = payload;

    // eslint-disable-next-line no-unused-vars
    const [_, [updatedProduct]] = await product.update(
      { ...rest, updated_at: new Date() },
      // the model is returned when returning:true is specified
      { where: { id }, returning: true }
    );

    if (productImageId && urlString) {
      // checks if id is a valid number
      if (
        isNaN(productImageId) ||
        +productImageId > Number.MAX_SAFE_INTEGER ||
        +id < 0
      ) {
        const error = new Error("id  must be a valid number");
        error.status = 400;
        throw error;
      }
      // checks if url string is a valid url
      if (!validURL(urlString)) {
        const error = new Error("url string must be valid");
        error.status = 400;
        throw error;
      }

      const updatedProductImage = await productImage.update(
        {
          urlString,
          update_at: new Date(),
        },
        {
          where: {
            id: productImageId,
          },
        }
      );
    }

    const options = {
      include: [{ model: productImage }, { model: category }],
    };
    if (id) options.where = { id };
    return product.findOne(options);
  },
  async createProduct(payload) {
    const currentDate = new Date();
    const { urlString, ...rest } = payload;

    const newProduct = await product.create({
      ...rest,
      created_at: currentDate,
      updated_at: currentDate,
    });
    const newProductJson = newProduct.toJSON();
    const newProductImage = await productImage.create({
      urlString: urlString,
      product_id: newProduct.id,
      created_at: currentDate,
      updated_at: currentDate,
    });

    const response = { ...newProductJson, productImages: [newProductImage] };

    return response;
  },
  deleteProduct(id) {
    return product.destroy({
      where: {
        id: id,
      },
    });
  },
};
