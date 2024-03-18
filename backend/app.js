const express = require("express");
const app = express();
const ErrorHandler = require("./utils/ErrorHandler");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");


app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use("/", express.static(uploads));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

// config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: "config/.env",
  });
}


// import routes
const user = require("./controller/user");

//routes declaration
app.use("/api/v2/user", user);


// it's for ErrorHandling
app.use(ErrorHandler);

module.exports = app;
