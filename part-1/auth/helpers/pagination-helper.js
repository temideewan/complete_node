const paginatedResourceHelper = async (req, resource) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const sortBy = req.query.sortBy || 'createdAt';
    const sortOrder = req.query.sortOrder === 'asc' ? 1 : -1;
    const totalImages = await resource.countDocuments();
    const totalPages = Math.ceil(totalImages / limit);
    const sortObj = {};
    sortObj[sortBy] = sortOrder;
    const response = await resource
      .find()
      .sort(sortObj)
      .skip(skip)
      .limit(limit);
    const meta = {
      currentPage: page,
      totalPages,
      totalImages,
      limit,
    };
    return { response, meta };
  } catch (error) {
    console.log(error);
    throw new Error('Error while fetching paginated resource');
  }
};

module.exports = paginatedResourceHelper;
