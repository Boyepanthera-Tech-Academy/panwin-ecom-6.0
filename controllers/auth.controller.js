const ejs = require("ejs");
const crypto = require("crypto");
const path = require("path");
const { User } = require("../models");
const { SendEmail } = require("./services");

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
    const user = new User(req.body);
    const token = user.generateToken();
    await user.save();
    return res.status(201).json({
      message: "account created",
      user: {
        _id: user._id,
        email: user.email,
        phone: user.phone,
        username: user.username,
        fullName: user.fullName,
      },
      token,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "internal server issues",
    });
  }
};

const LoginController = async (req, res) => {
  try {
    // Make a call to the db to check if user exist
    let userExist = await User.findOne({
      $or: [{ email: req.body.email }, { username: req.body.username }],
    });

    // Return error to client if user has no account
    if (!userExist) {
      return res.status(404).json({
        message: "You have no account. signup instead",
      });
    }

    //Check if the password is authentic
    const passwordCorrect = userExist.checkPassword(req.body.password);

    if (!passwordCorrect) {
      return res.status(400).json({
        message: "incorrect password",
      });
    }

    // generate token
    const token = userExist.generateToken();

    // send token and user data to client
    return res.status(200).json({
      message: "login successful",
      token,
      user: {
        _id: userExist._id,
        fullName: userExist.fullName,
        email: userExist.email,
        phone: userExist.phone,
        username: userExist.username,
      },
    });
  } catch (err) {
    return res.status(500).json({
      message: "internal server issues",
    });
  }
};

const ChangePasswordController = async (req, res, next) => {
  try {
    //get request body
    const { password, oldPassword } = req.body;

    // Find user with id inside of token
    const user = await User.findById(req.user._id);

    //Verify the old password
    let passwordCorrect = user.checkPassword(oldPassword);
    if (!passwordCorrect)
      return res.status(400).json({
        message: "incorrect password",
      });

    // Set the password key
    user.password = password;

    //Call the modelInstance .save() method
    user.save();
    return res.status(200).json({
      message: "password changed successfully",
    });
  } catch (err) {
    return res.status(500).json({
      message: "internal server issues",
    });
  }
};

const RequestPasswordResetController = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "email is required" });
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "user not found" });
    const templatePath = path.join(process.cwd(), "/views/index.ejs");
    console.log("template path", templatePath);
    let resetToken = crypto.randomBytes(24).toString("hex");
    console.log("resetToken", resetToken);
    user.resetToken = resetToken;
    await user.save();
    const url = process.env.FRONTEND_URL + "/password-reset/" + resetToken;
    const body = await ejs.renderFile(templatePath, { user, url });
    console.log("body", body);
    await SendEmail({
      receiver: user.email,
      subject: "Panwine Password Reset",
      body: body,
    });
    res.status(200).json({
      message: "Password reset steps sent, check your email",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json("server issues");
  }
};

module.exports = {
  SignupController,
  LoginController,
  ChangePasswordController,
  RequestPasswordResetController,
};
