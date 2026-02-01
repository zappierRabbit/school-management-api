// dotenv ONLY for local development
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./docs/swagger');

// Load config ONCE
const config = require('./config/index.config');

// 🔍 hard proof log (keep this!)
console.log('BOOT ENV CHECK:', {
  MONGO_URI: config.MONGO_URI,
  HAS_LONG_TOKEN: !!config.LONG_TOKEN_SECRET,
  NODE_ENV: config.ENV,
});

// Connect Mongo ONCE
const connectMongo = require('./connect/mongo');
connectMongo({ uri: config.MONGO_URI });

// Bootstrap admin AFTER DB
const bootstrapAdmin = require('./bootstrap/admin.bootstrap');
(async () => {
  await bootstrapAdmin();
  console.log('✅ Master admin verified');
})();

// Load infrastructure
require('./loaders/MongoLoader');
require('./loaders/MiddlewaresLoader');

const app = express();
app.use(express.json());

// Load managers
const ManagersLoader = require('./loaders/ManagersLoader');
const managers = new ManagersLoader({}).load();

// APIs
const AuthApi = require('./managers/api/Auth.api');
const SchoolApi = require('./managers/api/School.api');
const ClassroomApi = require('./managers/api/Classroom.api');
const StudentApi = require('./managers/api/Student.api');

const apis = [
  AuthApi({ managers }),
  SchoolApi({ managers }),
  ClassroomApi({ managers }),
  StudentApi({ managers }),
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
            user: req.user,
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
            user: req.user,
          });
          res.json(result);
        } catch (err) {
          res.status(400).json({ error: err.message });
        }
      }
    );
  });
});

// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Start server
app.listen(config.USER_PORT, () => {
  console.log(`🚀 Server running on port ${config.USER_PORT}`);
});
