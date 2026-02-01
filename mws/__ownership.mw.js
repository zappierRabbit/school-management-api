module.exports = function schoolOwnership() {
  return function (ctx, next) {
    const user = ctx.user;
    const { school_id } = ctx.params || {};

    if (user.role === "SCHOOL_ADMIN") {
      if (!school_id || String(user.school_id) !== String(school_id)) {
        throw new Error("Forbidden: cross-school access");
      }
    }

    return next();
  };
};
