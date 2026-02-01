const bcrypt = require("bcrypt");
const User = require("../managers/entities/user/user.schema");

module.exports = async function bootstrapAdmin() {
  const email = process.env.MASTER_ADMIN_EMAIL;
  const password = process.env.MASTER_ADMIN_PASSWORD;

  if (!email || !password) {
    console.log(
      "⚠️  MASTER_ADMIN_EMAIL or MASTER_ADMIN_PASSWORD not set, skipping admin bootstrap"
    );
    return;
  }

  const user = await User.findOne({ email });

  const password_hash = await bcrypt.hash(password, 10);

  // 🧠 Case 1: Admin already exists
  if (user) {
    // 🔧 Self-heal legacy admin (missing password_hash)
    if (!user.password_hash) {
      user.password_hash = password_hash;
      await user.save();
      console.log("🔧 Master admin password initialized from ENV:", email);
    } else {
      console.log("✅ Master admin already exists:", email);
    }
    return;
  }

  // 🆕 Case 2: Admin does not exist → create
  await User.create({
    email,
    role: "SUPERADMIN",
    password_hash,
    school_id: null
  });

  console.log("🚀 Master admin created from ENV:", email);
};
