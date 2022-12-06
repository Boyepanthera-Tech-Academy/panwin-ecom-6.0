const express = require("express");
const api = express();
const { indexController, authController } = require("./controllers");
const {
  validateSignupMiddleware,
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

api.post("/signup", authController.SignupController);

api.listen(port, AppStarter(port));
