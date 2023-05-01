const controller = (c) => {
  const fn = async (req, res, next) => {
    try {
      await c(req, res, next);
    } catch (error) {
      next(error);
    }
  };
  return fn;
};

module.exports = {
  controller,
};
