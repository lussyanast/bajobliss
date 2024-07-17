const { Op, Sequelize } = require('sequelize');
const Boom = require('@hapi/boom');
const { jwtDecode } = require('jwt-decode')

const { customAlphabet } = require('nanoid');
const nanoid = customAlphabet('1234567890abcdef', 10)

const sequelize = require('../../db/connection');
const db = sequelize.models

const getProduct = async (request, h) => {
  try {
    const { name, priceMin, priceMax } = request.query;

    const whereConditions = {};
    if (name) {
      whereConditions.name = {
        [Sequelize.Op.like]: `%${name}%`,
      };
    }
    if (priceMin) {
      whereConditions.price = {
        [Sequelize.Op.gte]: priceMin,
      };
    }
    if (priceMax) {
      if (!whereConditions.price) {
        whereConditions.price = {};
      }
      whereConditions.price[Sequelize.Op.lte] = priceMax;
    }

    const products = await db.Product.findAll({
      where: whereConditions,
      include: [
        {
          model: db.ProductPicture,
          as: 'pictures',
        },
      ],
    });

    return h.response(products).code(200);
  } catch (error) {
    console.log('Error during get products:', error);
    return Boom.badImplementation('Internal server error');
  }
};

const getProductById = async (request, h) => {
  try {
    const { id } = request.params;

    const product = await db.Product.findAll({
      where: {
        [Op.or]: [
          { product_id: id }, 
          { category_id: id } 
        ]
      },
      include: [
        {
          model: db.ProductPicture,
          as: 'pictures',
        },
      ],
    });
    
    if (!product) {
      return Boom.notFound('Product not found');
    }

    return h.response(product).code(200);
  } catch (error) {
    console.log('Error during get product by id:', error);
    return Boom.badImplementation('Internal server error');
  }
};

const createProduct = async (request, h) => {
  try {
    const token = request.headers.authorization.split(' ')[1];
    const decodedToken = jwtDecode(token);

    const { name, description, price, stock, weight, category_id, picture } = request.payload;

    if (decodedToken.role !== 'admin') {
      return Boom.unauthorized('You are not authorized to access this resource');
    }

    const category = await db.ProductCategory.findByPk(category_id);
    if (!category) {
      return Boom.notFound('Category not found');
    }

    const newProduct = await db.Product.create({
      product_id: `product_${nanoid()}`,
      name,
      description,
      price,
      stock,
      weight,
      category_id,
    });

    if (picture && picture.length > 0) {
      const picturesData = picture.map((pic) => ({
        product_picture_id: `pp_${nanoid()}`,
        product_id: newProduct.product_id,
        picture: pic,
      }));
      await db.ProductPicture.bulkCreate(picturesData);
    }

    const product = await db.Product.findByPk(newProduct.product_id, {
      include: [
        {
          model: db.ProductPicture,
          as: 'pictures',
        },
      ],
    });

    return h.response({
      message: 'Product created successfully',
      data: product,
    }).code(201);
  } catch (error) {
    console.log('Error during create product:', error);
    return Boom.badImplementation('Internal server error');
  }
};

const updateProduct = async (request, h) => {
  try {
    const token = request.headers.authorization.split(' ')[1];
    const decodedToken = jwtDecode(token);

    const { productId } = request.params;
    const { name, description, price, stock, weight, category_id, picture } = request.payload;

    if (decodedToken.role !== 'admin') {
      return Boom.unauthorized('You are not authorized to access this resource');
    }

    if (!Object.keys(request.payload).length) {
      return Boom.badRequest('Please provide data to update');
    }
    
    const product = await db.Product.findByPk(productId, {
      include: [
        {
          model: db.ProductPicture,
          as: 'pictures',
        },
      ],
    });
    if (!product) {
      return Boom.notFound('Product not found');
    }

    if (category_id) {
      const category = await db.ProductCategory.findByPk(category_id);
      if (!category) {
        return Boom.notFound('Category not found');
      }
    }

    await product.update({
      name: name ? name : product.name,
      description: description ? description : product.description,
      price: price ? price : product.price,
      stock: stock ? stock : product.stock,
      weight: weight ? weight : product.weight,
      category_id: category_id ? category_id : product.category_id,
    });

    if (picture && picture.length > 0) {
      for (const pic of picture) {
        if (pic.product_picture_id) {
          const productPicture = db.ProductPicture.findOne({
            where: {
              [Op.and]: [
                { product_picture_id: pic.product_picture_id },
                { product_id: productId }
              ]
            }
          });
          if (!productPicture) {
            return Boom.notFound('Product Picture not found');
          }

          await productPicture.update({ picture: pic.picture });
        } else {
          await db.ProductPicture.create({
            product_picture_id: `pp_${nanoid()}`,
            product_id: productId,
            picture: pic.picture,
          });
        }
      }
    }

    return h.response({
      message: 'Product updated successfully',
      data: product
    }).code(200);
  } catch (error) {
    console.log('Error during update product:', error);
    return Boom.badImplementation('Internal server error');
  }
};

const deleteProduct = async (request, h) => {
  try {
    const token = request.headers.authorization.split(' ')[1];
    const decodedToken = jwtDecode(token);

    const { productId } = request.params;

    if (decodedToken.role !== 'admin') {
      return Boom.unauthorized('You are not authorized to access this resource');
    }

    const product = await db.Product.findByPk(productId);
    if (!product) {
      return Boom.notFound('Product not found');
    }

    await product.destroy();

    return h.response({ message: 'Product deleted successfully' }).code(200);
  } catch (error) {
    console.log('Error during delete product:', error);
    return Boom.badImplementation('Internal server error');
  }
};

module.exports = {
  getProduct,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
