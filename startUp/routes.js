const courses= require('../routes/courses')
const genres= require('../routes/genres')
const customers= require('../routes/customers')
const movies= require('../routes/movies')
const users= require('../routes/users')
const auth= require('../routes/auth')

module.exports = function (app) {
//   app.use(logger);
  app.use("/api/courses", courses);
  app.use("/api/customers", customers);
  app.use("/api/genres", genres);
  app.use("/api/movies", movies);
  app.use("/api/users", users);
  app.use("/api/auth", auth);
};
