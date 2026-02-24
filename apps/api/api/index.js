// Vercel serverless function entry point
// Delegates to compiled NestJS application
const app = require("../dist/serverless");
module.exports = app.default || app;
