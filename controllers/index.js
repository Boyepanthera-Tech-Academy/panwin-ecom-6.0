const authController = require("./auth.controller");
const middlewares = require("./middlewares");

const indexController = (req, res) => {
  return res
    .status(200)
    .json({ message: "welcome to panwine ecom collections api" });
};

module.exports = {
  indexController,
  authController,
  middlewares,
};
