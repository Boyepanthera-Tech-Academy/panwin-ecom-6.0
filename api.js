const express = require("express");
const api = express();
const { indexController, authController } = require("./controllers");
const {
  validateSignupMiddleware,
  validateLoginMiddleware,
} = require("./models/validators/auth.validator");
const { AppStarter } = require("./utils");
const port = 6001;

//Form reading middleware configuration
api.use(express.json());
api.use(
  express.urlencoded({
    extended: true,
  })
);

api.get("/", indexController);

api.post("/signup", validateSignupMiddleware, authController.SignupController);
api.post("/login", validateLoginMiddleware, authController.LoginController);

api.listen(port, AppStarter(port));
