const Product = require('../models/Product');

const insertSampleProducts = async (req, res) => {
  try {
    const sampleProducts = [
      {
        name: 'Laptop',
        category: 'Electronics',
        price: 1200,
        inStock: true,
        tags: ['laptop', 'computer', 'tech'],
      },
      {
        name: 'Smartphone',
        category: 'Electronics',
        price: 60,
        inStock: true,
        tags: ['mobile', 'tech', 'electronics'],
      },
      {
        name: 'Headphones',
        category: 'Electronics',
        price: 400,
        inStock: false,
        tags: ['audio', 'tablet computer', 'tech'],
      },
      {
        name: 'Running Shoes',
        category: 'Sports',
        price: 50,
        inStock: true,
        tags: ['footwear', 'running', 'casual'],
      },
      {
        name: 'Novel',
        category: 'Books',
        price: 12,
        inStock: false,
        tags: ['fiction', 'non-fiction', 'self-help'],
      },
    ];
    const result = await Product.insertMany(sampleProducts);
    res.status(201).json({
      message: 'Sample products inserted successfully',
      success: true,
      data: `Inserted ${result.length} sample products`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server Error occurred', success: false });
  }
};

const getProductStats = async (req, res) => {
  try {
    const result = await Product.aggregate([
      {
        $match: {
          inStock: true,
          price: { $lte: 100 },
        },
      },
      // stage 2: group documents
      {
        $group: {
          _id: '$category',
          avgPrice: {
            $avg: '$price',
          },
          count: {
            $sum: 1,
          },
        },
      },
    ]);
    res.status(200).json({
      message: 'Product statistics',
      success: true,
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server Error occurred', success: false });
  }
};

const getProductAnalysis = async (req, res) => {
  try {
    const docs = await Product.aggregate([
      {
        $match: {
          category: 'Electronics',
        },
      },
      {
        $group: {
          _id: null,
          totalRevenue: {
            $sum: '$price',
          },
          averagePrice: {
            $avg: '$price',
          },
          maxProductPrice: {
            $max: '$price',
          },
          minProductPrice: {
            $min: '$price',
          },
        },
      },
      {
        $project:{
          _id: 0,
          totalRevenue: 1,
          averagePrice: 1,
          maxProductPrice: 1,
          minProductPrice: 1,
          priceRange: {
            $subtract: ['$maxProductPrice', '$minProductPrice']
          }
        }
      }
    ]);
    res.status(200).json({
      message: 'Product analysis',
      success: true,
      data: docs,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server Error occurred', success: false });
  }
};

module.exports = {
  insertSampleProducts,
  getProductStats,
  getProductAnalysis,
};
