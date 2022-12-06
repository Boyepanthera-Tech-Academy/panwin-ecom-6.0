const bcrypt = require("bcryptjs");
const { User } = require("../models");
const { validateSignupData } = require("../models/validators/auth.validator");

const SignupController = async (req, res) => {
  try {
    const { err } = validateSignupData(req.body);
    if (err) {
      return res.status(400).json(err);
    }
    //Check if a user already exist with same username or email
    let userExist = await User.findOne({
      $or: [{ email: req.body.email }, { username: req.body.username }],
    });
    // let userExist = await User.findOne({
    //   email: req.body.email,
    // });
    if (userExist) {
      return res.status(400).json({
        message: "Account exist, login instead",
      });
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    req.body.password = hash;
    const user = await User.create(req.body);

    return res.status(201).json({
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
