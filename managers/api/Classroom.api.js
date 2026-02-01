const token = require("../../mws/__token.mw");
const rbac = require("../../mws/__rbac.mw");

module.exports = ({ managers }) => ({
  base: "/classrooms",

  routes: [
    {
      method: "post",
      path: "/",
      middlewares: [token(), rbac(["SCHOOL_ADMIN"])],
      handler: (ctx) => managers.classroom.create(ctx)
    },
    {
      method: "get",
      path: "/",
      middlewares: [token(), rbac(["SCHOOL_ADMIN"])],
      handler: (ctx) => managers.classroom.list(ctx)
    },
    {
      method: "get",
      path: "/:id",
      middlewares: [token(), rbac(["SCHOOL_ADMIN"])],
      handler: (ctx) => managers.classroom.get(ctx)
    },
    {
      method: "put",
      path: "/:id",
      middlewares: [token(), rbac(["SCHOOL_ADMIN"])],
      handler: (ctx) => managers.classroom.update(ctx)
    },
    {
      method: "delete",
      path: "/:id",
      middlewares: [token(), rbac(["SCHOOL_ADMIN"])],
      handler: (ctx) => managers.classroom.remove(ctx)
    }
  ]
});
