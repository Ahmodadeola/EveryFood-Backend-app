const router = require("express").Router();
const dishController = require("../controllers/dishes");
const { body } = require("express-validator");

const dishCheck = [
  body("name", "Dish name is required")
    .trim()
    .isString()
    .withMessage("Dish name must be a string")
    .isLength({ min: 3 })
    .withMessage("Dish name must have length greater than 2"),
  body("scope", "Supply scope is required")
    .trim()
    .isString()
    .withMessage("Supply scope must be a string")
    .isLength({ min: 3 })
    .withMessage("scope must have length greater than 2"),
  body("price", "")
    .isNumeric()
    .withMessage("Price must be a number")
    .custom((value, { req }) => {
      if (value <= 0) throw new Error("Price must be greater than 0");
      return true;
    }),
];

router.get("/dishes", dishController.getDishes);
router.post("/add-dish", dishCheck, dishController.addDish);

module.exports = router;
