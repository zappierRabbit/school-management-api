module.exports = function rbac(allowedRoles = []) {
  return function (ctx, next) {
    const user = ctx.user;

    if (!user) {
      throw new Error("Unauthorized");
    }

    if (!allowedRoles.includes(user.role)) {
      throw new Error("Forbidden");
    }

    return next();
  };
};
