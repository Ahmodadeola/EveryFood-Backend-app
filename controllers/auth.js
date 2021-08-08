const User = require("../models/user");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      message: "Invalid inputs for signup",
      errors: errors.array(),
    });
  }
  const { confirmPassword, ...data } = req.body;
  const { password } = data;

  try {
    const hashedPassword = await bcrypt.hash(password, 12);
    let user = new User({ ...data, password: hashedPassword });
    user = await user.save();
    console.log(user, " in create user");

    res.status(201).json({
      message: "User created successfully!",
      data: {
        userId: user._id,
        email: user.email,
      },
    });
  } catch (err) {
    if (!err.statusCode) err.statusCode = 500;
    next(err);
  }
};

exports.login = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      message: "Invalid inputs for signup",
      errors: errors.array(),
    });
  }

  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });
    //check suer existence based on given email
    if (!user) {
      res.status(404).json({
        message: "user with email does not exist",
      });
    }

    //check email and password match
    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      res.status(401).json({
        message: "Incorrect password",
      });
    }

    //create and send token
    const token = jwt.sign(
      {
        email: user.email,
        userId: user._id.toString(),
      },
      process.env.JWT_SECRET,
      { expiresIn: "10hrs" }
    );
    res.send({ token, userId: user._id.toString() });
  } catch (err) {
    if (!err.statusCode) err.statusCode = 500;
    next();
  }
};
