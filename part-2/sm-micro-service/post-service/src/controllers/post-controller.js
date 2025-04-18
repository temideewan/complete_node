const Post = require('../models/Post');
const logger = require('../utils/logger');
const { publishEvent } = require('../utils/rabbitmq');
const { validateCreatePost } = require('../utils/validation');

async function invalidatePostCache(req, input) {
  const keys = await req.redisClient?.keys('posts:*');
  if (keys.length > 0) {
    await req.redisClient?.del(keys);
  }
  if (input) {
    await req.redisClient?.del(input);
  }
}

const createPost = async (req, res) => {
  logger.info('Create post endpoint hit...');
  try {
    // validate the schema
    const { error } = validateCreatePost(req.body);
    if (error) {
      logger.warn(`Validation error: ${error.details[0].message}`);
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }
    const { content, mediaIds } = req.body;
    const newlyCreatedPost = new Post({
      user: req.user.userId,
      content,
      mediaIds: mediaIds || [],
    });
    await newlyCreatedPost.save();
    await invalidatePostCache(req, newlyCreatedPost._id.toString());
    logger.info(`Post created successfully: ${newlyCreatedPost}`);
    res.status(201).json({
      success: true,
      message: 'Post created successfully',
    });
  } catch (e) {
    logger.error(`Error creating post ${e}`);
    res.status(500).json({
      success: false,
      message: 'Error creating post',
    });
  }
};
const getAllPosts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const startIndex = (page - 1) * limit; // 0 - 9, 10 - 19

    const cacheKey = `posts:${page}:${limit}`;

    const cachedPosts = await req.redisClient?.get(cacheKey);
    if (cachedPosts) {
      return res.json(JSON.parse(cachedPosts));
    }

    const posts = await Post.find({})
      .sort({ createdAt: -1 })
      .skip(startIndex)
      .limit(limit);
    const totalNoOfPosts = await Post.countDocuments();
    const result = {
      posts,
      currentPage: page,
      totalPages: Math.ceil(totalNoOfPosts / limit),
      totalPosts: totalNoOfPosts,
      itemPerPage: limit,
    };

    // save posts in cache for 5 minutes in seconds (i.e 5 * 60 = 300)
    await req.redisClient?.setex(cacheKey, 300, JSON.stringify(result));

    res.json(result);
  } catch (e) {
    logger.error(`Error getting all post ${e}`);
    res.status(500).json({
      success: false,
      message: 'Error getting all post',
    });
  }
};
const getPost = async (req, res) => {
  try {
    const postId = req.params.id;
    const cacheKey = `post:${postId}`;
    const cachedPost = await req.redisClient.get(cacheKey);
    if (cachedPost) {
      return res.json(JSON.parse(cachedPost));
    }

    const singlePost = await Post.findById(postId);
    if (!singlePost) {
      return res.status(404).json({
        success: false,
        message: 'Post not found',
      });
    }

    await req.redisClient?.setex(cacheKey, 3600, JSON.stringify(singlePost));

    res.json(singlePost);
  } catch (e) {
    logger.error(`Error getting single post ${e}`);
    res.status(500).json({
      success: false,
      message: 'Error getting single post',
    });
  }
};
const deletePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const cacheKey = `post:${postId}`;
    const deletedPost = await Post.findOneAndDelete({
      _id: postId,
      user: req.user.userId,
    });
    if (!deletedPost) {
      return res.status(404).json({
        success: false,
        message: 'Post not found',
      });
    }

    // publish post delete event
    await publishEvent('post.deleted', {
      post: deletedPost._id.toString(),
      userId: req.user.userId,
      mediaIds: deletedPost.mediaIds,
    }); 

    await invalidatePostCache(req, cacheKey);
    res.json({
      status: true,
      message: 'Post deleted successfully',
    });
  } catch (e) {
    logger.error(`Error deleting post ${e}`);
    res.status(500).json({
      success: false,
      message: 'Error deleting post',
    });
  }
};

module.exports = {
  createPost,
  deletePost,
  getAllPosts,
  getPost,
};
