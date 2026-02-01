const Student = require("./student.schema");
const Classroom = require("../classroom/classroom.schema");

module.exports = class StudentManager {
  constructor() {}

  async create(ctx) {
    const { body, user } = ctx;

    const student = await Student.create({
      ...body,
      school_id: user.school_id
    });

    return student;
  }

  async list(ctx) {
    const { user } = ctx;

    return Student.find({ school_id: user.school_id });
  }

  async assignToClassroom(ctx) {
    const { student_id, classroom_id } = ctx.body;
    const { user } = ctx;

    const classroom = await Classroom.findOne({
      _id: classroom_id,
      school_id: user.school_id
    });

    if (!classroom) {
      throw new Error("Classroom not found");
    }

    const count = await Student.countDocuments({
      classroom_id,
      school_id: user.school_id
    });

    if (count >= classroom.capacity) {
      throw new Error("Classroom is full");
    }

    return Student.findOneAndUpdate(
      { _id: student_id, school_id: user.school_id },
      { classroom_id },
      { new: true }
    );
  }

  async transfer(ctx) {
    const { student_id, to_classroom_id } = ctx.body;
    const { user } = ctx;

    const targetClassroom = await Classroom.findOne({
      _id: to_classroom_id,
      school_id: user.school_id
    });

    if (!targetClassroom) {
      throw new Error("Target classroom not found");
    }

    const count = await Student.countDocuments({
      classroom_id: to_classroom_id,
      school_id: user.school_id
    });

    if (count >= targetClassroom.capacity) {
      throw new Error("Target classroom is full");
    }

    return Student.findOneAndUpdate(
      { _id: student_id, school_id: user.school_id },
      {
        classroom_id: to_classroom_id,
        status: "TRANSFERRED"
      },
      { new: true }
    );
  }

  async remove(ctx) {
    const { id } = ctx.params;
    const { user } = ctx;

    return Student.findOneAndDelete({
      _id: id,
      school_id: user.school_id
    });
  }
};
