const swaggerJsdoc = require("swagger-jsdoc");
const path = require("path");

module.exports = swaggerJsdoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "School Management System API",
      version: "1.0.0",
      description: "API for managing schools, classrooms, and students"
    },
    servers: [
      {
        url: "http://167.172.124.213:3000",
        description: "Production server"
      },
      {
        url: "http://localhost:3000",
        description: "Local server"
      }
    ]
  },
  apis: [
    path.join(__dirname, "*.yaml")
  ]
});
