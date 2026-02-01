const request = require("../helpers/testApp")();

let token;
let classroomId;

beforeAll(async () => {
  const login = await request.post("/auth/login").send({
    email: "admin@system.com",
    password: "SuperSecret123!"
  });
  token = login.body.token;

  const school = await request
    .post("/schools")
    .set("Authorization", `Bearer ${token}`)
    .send({ name: "Capacity School" });

  const classroom = await request
    .post("/classrooms")
    .set("Authorization", `Bearer ${token}`)
    .send({
      name: "Class A",
      schoolId: school.body._id,
      capacity: 1
    });

  classroomId = classroom.body._id;
});

describe("Classroom Capacity", () => {
  it("should allow first student", async () => {
    const res = await request
      .post("/students")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Student One",
        classroomId
      });

    expect(res.statusCode).toBe(200);
  });

  it("should reject second student", async () => {
    const res = await request
      .post("/students")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Student Two",
        classroomId
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.error).toMatch(/capacity/i);
  });
});
