module.exports = ({ managers }) => ({
  base: "/auth",
  routes: [
    {
      method: "post",
      path: "/login",
      middlewares: [],
      handler: (ctx) => managers.auth.login(ctx)
    }
  ]
});
