const jwt = require("jsonwebtoken");
const secret = "capiv@ras#$5a78";

module.exports = function (request, response, next) {
  var token = request.headers["x-access-token"];

  if (!token) { 
    return response.status(401).send({});
  }

  jwt.verify(token, secret, function(err, decoded) {
    if (err) { 
      return response.status(401).send({});
    }
    
    next();
  });
};