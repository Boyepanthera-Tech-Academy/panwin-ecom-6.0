const { User } = require("../models");

const SignupController = (req, res) => {
  try {
    const user = User.create(req.body);
    res.status(201).json({
      message: "account created",
      user,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "internal server issues",
    });
  }
};

module.exports = {
  SignupController,
};
