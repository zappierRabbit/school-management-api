const Classroom = require("./classroom.schema");

module.exports = class ClassroomManager {
  constructor() {}

  async create(ctx) {
    const { body, user } = ctx;

    // Force school ownership from token (not request body)
    const payload = {
      ...body,
      school_id: user.school_id
    };

    return Classroom.create(payload);
  }

  async list(ctx) {
    const { user } = ctx;

    return Classroom.find({ school_id: user.school_id });
  }

  async get(ctx) {
    const { id } = ctx.params;
    const { user } = ctx;

    return Classroom.findOne({
      _id: id,
      school_id: user.school_id
    });
  }

  async update(ctx) {
    const { id } = ctx.params;
    const { body, user } = ctx;

    return Classroom.findOneAndUpdate(
      { _id: id, school_id: user.school_id },
      body,
      { new: true, runValidators: true }
    );
  }

  async remove(ctx) {
    const { id } = ctx.params;
    const { user } = ctx;

    return Classroom.findOneAndDelete({
      _id: id,
      school_id: user.school_id
    });
  }
};
