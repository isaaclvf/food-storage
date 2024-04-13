const Food = require("../model/food.model");

async function getAllFoods(page = 1, limit = 10) {
  const foods = await Food.find()
    .skip((page - 1) * limit)
    .limit(limit);
  return foods;
}

async function getFoodById(id) {
  const food = Food.findById(id);

  if (!food) {
    throw new Error("Food not found");
  }

  return food;
}

async function createFood(name, category, quantity, expirationDate, price) {
  try {
    const food = new Food({
      name,
      category,
      quantity,
      expirationDate,
      price,
    });

    await food.save();
    return food;
  } catch (err) {
    if (err.name === "ValidationError") {
      throw new Error("Validation error: " + err.message);
    } else if (err.name === "MongoError" && err.code === 11000) {
      throw new Error(
        "Duplicate key error: A food with the same name already exists"
      );
    } else {
      throw new Error("Failed to create food item");
    }
  }
}

async function updateFood(id, updates) {
  try {
    const food = await Food.findById(id);
    if (!food) {
      throw new Error("Food not found");
    }

    Object.assign(food, updates);
    await food.save();

    return food;
  } catch (err) {
    throw new Error("Failed to update food");
  }
}

async function deleteFood(id) {
  try {
    const food = await Food.findById(id);
    if (!food) {
      throw new Error("Food not found");
    }

    await food.remove();

    return { message: "Food deleted successfully" };
  } catch (err) {
    throw new Error("Failed to delete food");
  }
}

module.exports = {
  getAllFoods,
  getFoodById,
  createFood,
  updateFood,
  deleteFood,
};
