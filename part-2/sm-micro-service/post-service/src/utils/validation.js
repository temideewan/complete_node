const Joi = require('joi');

const validateCreatePost = (data) => {
  const Schema = Joi.object({
    content: Joi.string().min(3).max(5000).required(),
    mediaIds: Joi.array().items(Joi.string())
  });

  return Schema.validate(data);
};

module.exports = { validateCreatePost };
