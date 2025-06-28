module.exports.responseDecorator = (req, res, next) => {
  console.log(res);
  next();
};
