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
    const cacheKey = `search:${query}`
    const cachedResult = await req.redisClient?.get(cacheKey)

    if(cachedResult){
      return res.json(JSON.parse(cachedResult));
    }
    const results = await Search.find(
      {
        $text: { $search: query },
      },
      { score: { $meta: 'textScore' } }
    )
      .sort({ score: { $meta: 'textScore' } })
      .limit(10);
    // save search results in cache for 5 minutes in seconds (i.e 5 * 60 = 300)
    await req.redisClient?.setex(cacheKey, 300, JSON.stringify(results));
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
