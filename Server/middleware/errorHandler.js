// REST Service
// error handler functions

/* eslint no-unused-vars: 0 */

const errorHandler = (err, req, res, next) => {
  console.log(`Error: ${err.stack}`.bgRed);
  res.status(500).send(err.message);
};

const notFound = (req, res) => {
  console.log(
    `Error 404: Route not found ${req.method} ${req.originalUrl}`.red
  );
  res.status(404).end();
};

module.exports = { errorHandler, notFound };
