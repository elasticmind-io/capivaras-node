const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const secret = "capiv@ras#$5a78";

router.post("/", function (request, response) {
  const email = request.body.email;
  const senha = request.body.senha;
  const query = "SELECT id, senha FROM usuarios WHERE status = 1 AND email = ?";

  request.getConnection(function(error, conn) {
    conn.query(query, [email], function(err, results, fields) {
        if (err) {
          return response.status(500).send(err);
        }
        else {
          if (results.length == 0 || !bcrypt.compareSync(senha, results[0].senha)) {
            return response.status(401).send({});
          }

          var usuario = results[0];
          var token = jwt.sign({ id: usuario.id, nome: usuario.nome }, secret, {
            expiresIn: 86400
          });

          response.status(201).send({ autenticado: true, token: token });
        }
    });
  });
});

module.exports = router;