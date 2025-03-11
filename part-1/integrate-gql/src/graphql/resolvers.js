const products = require('../data/products.js');
const Product = require('../models/Product.js');

const resolvers = {
  Query: {
    products: async () => await Product.find({}),
    product: async (_, { id }) => await Product.findById(id),
  },
  Mutation: {
    createProduct: async (_, args) => {
      const newProduct = new Product(args);
      await newProduct.save();
      return newProduct;
    },
    updateProduct: async (_, { id, title, inStock, price }) => {
      const product = await Product.findByIdAndUpdate(id, { title, inStock, price}, {new: true});
      if (!product) {
        return null;
      }
      return product;
    },
    deleteProduct: async (_ , {id}) => {
      const deletedProduct = await Product.findByIdAndDelete(id)
      if(!deletedProduct) return false
      return true;
    },
   
  },
};

module.exports = resolvers;
