const jwt = require("jsonwebtoken");

module.exports = function token() {
  return function (ctx, next) {
    const authHeader = ctx.req.headers["authorization"];
    if (!authHeader) {
      throw new Error("Unauthorized");
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      throw new Error("Unauthorized");
    }

    try {
      const decoded = jwt.verify(token, process.env.LONG_TOKEN_SECRET);
      ctx.user = decoded;
      return next();
    } catch (err) {
      throw new Error("Invalid token");
    }
  };
};
