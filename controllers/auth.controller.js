const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");
const { User } = require("../models");

const SignupController = async (req, res) => {
  try {
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
    const user = new User(req.body);
    const token = JWT.sign(
      {
        _id: user._id,
        email: user.email,
        username: user.username,
      },
      process.env.JWT_SECRET,
      {
        issuer: "http://localhost:6001",
        expiresIn: "6h",
      }
    );
    await user.save();
    return res.status(201).json({
      message: "account created",
      user,
      token,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "internal server issues",
    });
  }
};

const LoginController = (req, res) => {
  try {
    res.send("ok");
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "internal server issues",
    });
  }
};

module.exports = {
  SignupController,
  LoginController,
};
