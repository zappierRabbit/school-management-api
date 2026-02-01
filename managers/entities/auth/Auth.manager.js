const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../user/user.schema");

module.exports = class AuthManager {
  async login(ctx) {
    const { email, password } = ctx.body;

    if (!email || !password) {
      throw new Error("Email and password are required");
    }

    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("Invalid credentials");
    }

    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) {
      throw new Error("Invalid credentials");
    }

    const payload = {
      user_id: user._id,
      role: user.role,
      school_id: user.school_id
    };

    return {
      token: jwt.sign(payload, process.env.LONG_TOKEN_SECRET, {
        expiresIn: "1h"
      })
    };
  }
};
