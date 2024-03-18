const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(fileUpload({ useTempFiles: true }));

//app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

if (process.env.NODE_ENV != "production") {
  require("dotenv").config({
    path: "backend/config/.env",
  });
}

// it's for ErrorHandling
// app.use(ErrorHandler);

module.exports = app;
