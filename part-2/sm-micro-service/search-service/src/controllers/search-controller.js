const Search = require('../models/Search');
const logger = require('../utils/logger');

const searchPostController = async (req, res) => {
  logger.info('Search endpoint hit');

  try {
    const { query } = req.query;
    if (!query || query.trim() === '') {
      logger.warn('Search query is empty');
      return res.status(400).json({
        success: false,
        message: 'Search query cannot be empty',
      });
    }
    const results = await Search.find(
      {
        $text: { $search: query },
      },
      { score: { $meta: 'textScore' } }
    )
      .sort({ score: { $meta: 'textScore' } })
      .limit(10);

    res.json(results);
  } catch (error) {
    logger.error('Error in searchPostController', error);
    return res.status(500).json({
      success: false,
      message: 'Error while searching posts',
    });
  }
};

module.exports = {searchPostController}
