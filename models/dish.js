const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DishSchema = new Schema({
  imgLink: String,
  price: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  // vendorId: {
  //   type: mongoose.Types.ObjectId,
  //   required: true,
  //   ref: "Profile",
  // },
  vendor: {
    type: String,
    required: true,
  },
  scope: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Dish", DishSchema);
