const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = (socket, next) => {
  console.log(socket.handshake.query.token);
  if (socket.handshake.query && socket.handshake.query.token) {
    try {
      const decoded = jwt.verify(
        socket.handshake.query.token,
        config.get("jwtSecret")
      );
      socket.decoded = decoded;
      console.log(socket.decoded);
      next();
    } catch (err) {
      next(new Error("Authentication error"));
    }
  } else {
    next(new Error("Authentication error"));
  }
};
