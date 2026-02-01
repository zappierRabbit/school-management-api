const { setupDB, teardownDB } = require("./setup");

beforeAll(async () => {
  process.env.LONG_TOKEN_SECRET = "test-secret";
  process.env.MASTER_ADMIN_EMAIL = "admin@system.com";
  process.env.MASTER_ADMIN_PASSWORD = "SuperSecret123!";
  await setupDB();
});

afterAll(async () => {
  await teardownDB();
});
