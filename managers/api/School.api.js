const rbac = require("../../mws/__rbac.mw");
const token = require("../../mws/__token.mw");

module.exports = ({ managers }) => ({
  base: "/schools",

  routes: [
    {
      method: "post",
      path: "/",
      middlewares: [token(), rbac(["SUPERADMIN"])],
      handler: (ctx) => managers.school.create(ctx)
    },
    {
      method: "get",
      path: "/",
      middlewares: [token(), rbac(["SUPERADMIN"])],
      handler: () => managers.school.list()
    },
    {
      method: "get",
      path: "/:id",
      middlewares: [token(), rbac(["SUPERADMIN"])],
      handler: (ctx) => managers.school.get(ctx)
    },
    {
      method: "put",
      path: "/:id",
      middlewares: [token(), rbac(["SUPERADMIN"])],
      handler: (ctx) => managers.school.update(ctx)
    },
    {
      method: "delete",
      path: "/:id",
      middlewares: [token(), rbac(["SUPERADMIN"])],
      handler: (ctx) => managers.school.remove(ctx)
    }
  ]
});
