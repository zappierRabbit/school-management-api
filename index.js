require("dotenv").config();

const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./docs/swagger");
console.log('BOOT ENV CHECK:', {
  MONGO_URI: process.env.MONGO_URI,
  HAS_LONG_TOKEN: !!process.env.LONG_TOKEN_SECRET,
  NODE_ENV: process.env.NODE_ENV,
});

require("./config/index.config");

const connectMongo = require('./connect/mongo')();
connectMongo({
  uri: process.env.MONGO_URI
});

const bootstrapAdmin = require("./bootstrap/admin.bootstrap");
(async () => {
  await bootstrapAdmin();
})();

require("./loaders/MongoLoader");
require("./loaders/MiddlewaresLoader");

const express = require("express");
const app = express();
app.use(express.json());

const ManagersLoader = require("./loaders/ManagersLoader");
const managers = new ManagersLoader({}).load();

// Load APIs
const AuthApi = require("./managers/api/Auth.api");
const SchoolApi = require("./managers/api/School.api");
const ClassroomApi = require("./managers/api/Classroom.api");
const StudentApi = require("./managers/api/Student.api");

const apis = [
  SchoolApi({ managers }),
  ClassroomApi({ managers }),
  StudentApi({ managers }),
  AuthApi({ managers })
];

// Mount routes
apis.forEach((api) => {
  api.routes.forEach((route) => {
    app[route.method](
      api.base + route.path,
      ...route.middlewares.map((mw) => (req, res, next) =>
        mw(
          {
            req,
            res,
            body: req.body,
            params: req.params,
            user: req.user
          },
          next
        )
      ),
      async (req, res) => {
        try {
          const result = await route.handler({
            req,
            res,
            body: req.body,
            params: req.params,
            user: req.user
          });
          res.json(result);
        } catch (err) {
          res.status(400).json({ error: err.message });
        }
      }
    );
  });
});

const PORT = process.env.PORT || 3000;

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
