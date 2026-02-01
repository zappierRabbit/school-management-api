const School = require("./school.schema");

module.exports = class SchoolManager {
  constructor() {}

  async create(ctx) {
    const { body } = ctx;
    return School.create(body);
  }

  async list() {
    return School.find();
  }

  async get(ctx) {
    const { id } = ctx.params;
    return School.findById(id);
  }

  async update(ctx) {
    const { id } = ctx.params;
    const { body } = ctx;

    return School.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true
    });
  }

  async remove(ctx) {
    const { id } = ctx.params;
    return School.findByIdAndDelete(id);
  }
};
