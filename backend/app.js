"use strict";

/** Express app for scenic. */

const express = require("express");
const cors = require("cors");

const { NotFoundError } = require("./expressError");

const { authenticateJWT } = require("./middleware/auth");
const authRoutes = require("./routes/auth");
const usersRoutes = require("./routes/users");
const stateRoutes = require("./routes/states");
const bywayRoutes = require("./routes/byways");

const morgan = require("morgan");

const app = express();

// Julie thought this line instead of the line after it might fix the issue on Render of her not being able to see it, but Skye didn't think CORS was the issue
// app.use(cors({ origin: '*' }));
app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));
app.use(authenticateJWT);

app.use("/auth", authRoutes);
app.use("/users", usersRoutes);
app.use("/states", stateRoutes);
app.use("/byways", bywayRoutes);

/** Handle 404 errors -- this matches everything */
app.use(function (req, res, next) {
  return next(new NotFoundError());
});

/** Generic error handler; anything unhandled goes here. */
app.use(function (err, req, res, next) {
  if (process.env.NODE_ENV !== "test") console.error(err.stack);
  const status = err.status || 500;
  const message = err.message;

  return res.status(status).json({
    error: { message, status },
  });
});

module.exports = app;
