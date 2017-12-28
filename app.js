const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const myConnection  = require("express-myconnection");

const config = require("./config");
const loginController = require("./controllers/login.controller.js");
const pedidosController = require("./controllers/pedidos.controller.js");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(myConnection(mysql, config, "pool"));

const router = express.Router();
const port = process.env.PORT || 3000;

app.use("/login", loginController);
app.use("/pedidos", pedidosController);

app.listen(port, function () {
  console.log("Server started");
});