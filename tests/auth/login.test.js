const request = require("../helpers/testApp")();

describe("Auth Login", () => {
  it("should login master admin", async () => {
    const res = await request
      .post("/auth/login")
      .send({
        email: "admin@system.com",
        password: "SuperSecret123!"
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
  });

  it("should fail with wrong password", async () => {
    const res = await request
      .post("/auth/login")
      .send({
        email: "admin@system.com",
        password: "wrong"
      });

    expect(res.statusCode).toBe(401);
  });
});
