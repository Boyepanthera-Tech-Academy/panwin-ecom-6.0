const Joi = require("joi");

const signupSchema = Joi.object({
  username: Joi.string().required(),
  fullName: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  password: Joi.string().min(8).required(),
});

const validateSignupData = (data) => {
  let { error: err, value } = signupSchema.validate(data);
  return { err, value };
};

const validateSignupMiddleware = (req, res, next) => {
  try {
    let { error, value } = signupSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: error,
      });
    }
    next();
  } catch (err) {
    return res.status(500).json({
      message: "server issues",
    });
  }
};

module.exports.validateSignupData = validateSignupData;
module.exports.validateSignupMiddleware = validateSignupMiddleware;
