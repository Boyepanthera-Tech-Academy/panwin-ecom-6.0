const express = require("express");
const api = express();
const { indexController } = require("./controllers");
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

api.listen(port, AppStarter(port));
