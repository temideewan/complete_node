function getPrismaPagination(
  page = 1,
  limit = 10,
  { skipProp = 'skip', limitProp = 'take' }
) {
  const skip = (page - 1) * limit;
  return {
    [skipProp]: skip,
    [limitProp]: limit,
  };
}

module.exports = { getPrismaPagination };
