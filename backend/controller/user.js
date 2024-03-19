const express = require("express");
const path = require("path");
const User = require("../model/user");
const router = express.Router();
const { upload } = require("../multer");
const ErrorHandler = require("../utils/ErrorHandler");
const fs = require("fs");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const jwt = require("jsonwebtoken");
const sendMail = require("../utils/sendMail");
const user = require("../model/user");
const sendToken = require("../utils/jwtToken");


router.post("/create-user", upload.single("file"), async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const userEmail = await User.findOne({ email });

    if (userEmail) {
      const filename = req.files.filename;
      constfilePath = `upload/${filename}`;
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error(err);
          res.status(500).json({ message: "erroe delect file" });
        } else {
          res.json({ message: "file delected succefully" });
        }
      });
      return next(new ErrorHandler("User already exists", 400));
    }

    const filename = req.file.filename;
    const fileUrl = path.join(filename);
    const user = {
      name: name,
      email: email,
      password: password,
      avatar: fileUrl,
    };

    const activationToken = createActivationToken(user);

    const activationUrl = `https://localhost:3000/activation/$({activationToken)}`;
    try {
      await sendMail({
        email: user.email,
        subject: "Activation your account",
        message: `Hello $(user.name), please click on the activate your account: ${activationUrl}`,
      });
      res.status(201).json({
        succcess: true,
        message: `Check you email:${user.email} to activate your account`,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  } catch (error) {
    return nest(new ErrorHandler(error.message), 400);
  }

  // Create a new activation token
  const createActivationToken = (user) => {
    return jwt.sign(user, process.env.ACTIVATION_SECRET, {
      expiresIn: "5M",
    });
  };
});

router.post(
  "/activation",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { activation_token } = req.body;
      const newUser = jwt.verify(
        activation_token,
        process.env.ACTIVATION_SECRET
      );
      if (!newUser) {
        return next(new ErrorHandler("Invlid token", 400));
      }
      const { name, email, password, avatar } = newUser;
      User.create({
        name,
        email,
        password,
        avatar,
      });
      sendToken((newUser, 201, res));
    } catch (error) {}
  })
);

module.exports = router;
