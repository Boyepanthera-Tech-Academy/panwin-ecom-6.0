const express = require("express");
const { appendFile } = require("fs");
const api = express();
const path = require("path");
const {
  indexController,
  authController,
  categoryController,
  middlewares,
  productController,
} = require("./controllers");
const {
  validateSignupMiddleware,
  validateLoginMiddleware,
  validatePasswordChangeMiddleware,
} = require("./models/validators/auth.validator");
const {
  validateProductMiddleware,
  validateProductUpdateMiddleware,
} = require("./models/validators/product.validator");
const { AppStarter } = require("./utils");
const port = 6001;

//Form reading middleware configuration
api.use(express.json());
api.use(
  express.urlencoded({
    extended: true,
  })
);

//middleware to serve static assets/file from the public folder
api.use(express.static(path.join(__dirname, "public")));

api.get("/", indexController);

api.post("/signup", validateSignupMiddleware, authController.SignupController);
api.post("/login", validateLoginMiddleware, authController.LoginController);
api.put(
  "/password",
  validatePasswordChangeMiddleware,
  middlewares.verifyToken,
  authController.ChangePasswordController
);

api.post("/forgot-password", authController.RequestPasswordResetController);

api.get("/category", categoryController.FetchAll);
api.post("/category", middlewares.checkIfAdmin, categoryController.Create);
api.get("/category/:id", categoryController.FetchById);
api.put("/category/:id", middlewares.checkIfAdmin, categoryController.Update);
api.delete(
  "/category/:id",
  middlewares.checkIfAdmin,
  categoryController.Delete
);

api.get("/product", productController.FetchAll);
api.post(
  "/product",
  middlewares.checkIfAdmin,
  validateProductMiddleware,
  productController.Create
);
api.get("/product/:id", productController.FetchById);
api.put(
  "/product/:id",
  middlewares.checkIfAdmin,
  validateProductUpdateMiddleware,
  productController.Update
);
api.delete("/product/:id", middlewares.checkIfAdmin, productController.Delete);

api.listen(port, AppStarter(port));
