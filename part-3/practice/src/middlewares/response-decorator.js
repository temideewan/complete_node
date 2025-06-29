module.exports.responseDecorator = (req, res, next) => {
  const originalSend = res.send;
  res.send = function () {
    arguments[0] = modifyResSend(arguments[0], res);
    originalSend.apply(res, arguments);
  };
  next();
};

function modifyResSend(response, resObj) {
  const internalResponse = JSON.parse(response);
  if (typeof internalResponse === 'object') {
    if (resObj.statusCode) {
      internalResponse.status = resObj.statusCode < 400 && internalResponse.success ? 'SUCCESS' : 'FAILED';
      delete internalResponse.success;
    }
  }
  return JSON.stringify(internalResponse);
}
