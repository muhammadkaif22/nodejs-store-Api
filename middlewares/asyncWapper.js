const asyncWapper = (fn) => {
  return async (req, res, next) => {
    try {
      fn(req, res, next);
    } catch (err) {
      next(err);
    }
  };
};

module.exports = asyncWapper;
