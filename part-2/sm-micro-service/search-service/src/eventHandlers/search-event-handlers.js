const Search = require('../models/Search');
const logger = require('../utils/logger');

async function invalidatePostCache(req, input) {
  const keys = await req.redisClient?.keys('search:*');
  if (keys.length > 0) {
    await req.redisClient?.del(keys);
  }
  if (input) {
    await req.redisClient?.del(input);
  }
}
async function handlePostCreated({
  postId,
  userId,
  content,
  createdAt,
  redisClient,
}) {
  try {
    const newSearchPost = new Search({
      postId,
      userId,
      content,
      createdAt,
    });

    await newSearchPost.save();
    logger.info(
      `Search post created: ${postId}, ${newSearchPost._id.toString()}`
    );
    await invalidatePostCache({ redisClient });
  } catch (e) {
    logger.error(`Error handling post creation event`);
  }
}

async function handlePostDeleted({ post }) {
  try {
    await Search.findOneAndDelete({
      postId: post,
    });
    logger.info(`Search post deleted: ${post}`);
  } catch (error) {
    logger.error(`Error handling post deletion event`);
  }
}

module.exports = { handlePostCreated, handlePostDeleted };
