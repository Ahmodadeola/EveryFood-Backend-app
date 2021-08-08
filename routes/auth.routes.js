const { body } = require("express-validator");
const router = require("express").Router();
const authController = require("../controllers/auth");
const User = require("../models/user");
const bcrypt = require("bcryptjs");

const signupCheck = [
  body("email")
    .isEmail()
    .withMessage("Invalid email")
    .normalizeEmail()
    .custom(async (value, { req }) => {
      try {
        const user = await User.findOne({ email: req.body.email });
        if (user) return Promise.reject("Email already exist");
      } catch (err) {
        console.log(err);
      }
    }),

  body("firstName")
    .isString()
    .withMessage("First name must be a string")
    .trim()
    .isAlpha()
    .withMessage("First name cannot include numbers or special characters"),

  body("lastName")
    .isString()
    .withMessage("Last name must be a string")
    .trim()
    .isAlpha()
    .withMessage("Last name cannot include numbers or special characters"),

  body("password").isString().withMessage("password must be a string").trim(),

  body("confirmPassword").custom((value, { req }) => {
    if (!(value === req.body.password)) throw new Error("password mismatch");
    return true;
  }),
];

const loginCheck = [
  body("email").isEmail().withMessage("Invalid email").normalizeEmail(),
];

router.post("/signup", signupCheck, authController.signup);

router.post("/login", loginCheck, authController.login);

module.exports = router;
