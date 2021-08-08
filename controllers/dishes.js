const Dish = require("../models/dish");
const { validationResult } = require("express-validator/check");

exports.getDishes = async (req, res) => {
  try {
    const dishes = await Dish.find();
    res.send(dishes);
  } catch (err) {
    res.send(err);
  }
};

exports.addDish = async (req, res) => {
  console.log(req.body);
  const data = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      msg: "Incorrect input values",
      errors: errors.array(),
    });
  }
  try {
    let dish = new Dish(data);
    dish = await dish.save();
    res.send(dish);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
