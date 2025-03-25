const {rateLimit} = require("express-rate-limit")
const createBasicRateLimiter = (maxRequests, time) => {
  return rateLimit({
    max: maxRequests,
    windowMs: time,
    standardHeaders: true,
    legacyHeaders: false
  })
}

module.exports = createBasicRateLimiter
