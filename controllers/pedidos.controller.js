const express = require("express");
const router = express.Router();
const autenticacao = require("../controllers/autenticacao.js");

router.get("/", autenticacao, function (request, response) {
  var token = request.headers["x-access-token"];
  response.status(200).send(token);
});

module.exports = router;