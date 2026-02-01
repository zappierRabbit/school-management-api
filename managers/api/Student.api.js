const token = require("../../mws/__token.mw");
const rbac = require("../../mws/__rbac.mw");

module.exports = ({ managers }) => ({
  base: "/students",

  routes: [
    {
      method: "post",
      path: "/",
      middlewares: [token(), rbac(["SCHOOL_ADMIN"])],
      handler: (ctx) => managers.student.create(ctx)
    },
    {
      method: "get",
      path: "/",
      middlewares: [token(), rbac(["SCHOOL_ADMIN"])],
      handler: (ctx) => managers.student.list(ctx)
    },
    {
      method: "post",
      path: "/assign",
      middlewares: [token(), rbac(["SCHOOL_ADMIN"])],
      handler: (ctx) => managers.student.assignToClassroom(ctx)
    },
    {
      method: "post",
      path: "/transfer",
      middlewares: [token(), rbac(["SCHOOL_ADMIN"])],
      handler: (ctx) => managers.student.transfer(ctx)
    },
    {
      method: "delete",
      path: "/:id",
      middlewares: [token(), rbac(["SCHOOL_ADMIN"])],
      handler: (ctx) => managers.student.remove(ctx)
    }
  ]
});
