const Joi = require("joi");

const productSchema = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().required(),
  category: Joi.string().required(),
  image: Joi.string().required(),
  stock: Joi.number(),
});

const productUpdateSchema = Joi.object({
  name: Joi.string(),
  price: Joi.number(),
  category: Joi.string(),
  image: Joi.string(),
  stock: Joi.number(),
});

const validateProductMiddleware = (req, res, next) => {
  try {
    let { error, value } = productSchema.validate(req.body);
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
const validateProductUpdateMiddleware = (req, res, next) => {
  try {
    let { error, value } = productUpdateSchema.validate(req.body);
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

module.exports = {
  validateProductMiddleware,
  validateProductUpdateMiddleware,
};
