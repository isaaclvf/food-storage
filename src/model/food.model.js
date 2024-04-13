const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  expirationDate: {
    type: Date,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

const Food = mongoose.model("Food", foodSchema);

module.exports = Food;
