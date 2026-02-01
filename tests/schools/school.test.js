const request = require("../helpers/testApp")();

let token;

beforeAll(async () => {
  const res = await request.post("/auth/login").send({
    email: "admin@system.com",
    password: "SuperSecret123!"
  });
  token = res.body.token;
});

describe("School Management", () => {
  it("should create a school", async () => {
    const res = await request
      .post("/schools")
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "Test School" });

    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe("Test School");
  });

  it("should list schools", async () => {
    const res = await request
      .get("/schools")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
