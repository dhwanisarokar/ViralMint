const express = require("express");
const httpStatus = require("http-status");
const cors = require("cors");

const { errorHandler } = require("./middlewares/error.middleware");
const ApiError = require("./utils/ApiError.js");
const router = require("./routes");


const app = express();

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.options("*", cors());

// Routes
app.use("/api", router);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
});

// golab Error Middleware
app.use(errorHandler);


module.exports = app;