const express = require("express");
const foodsRouter = express.Router();
const {
  getAllFoods,
  getFoodById,
  createFood,
  updateFood,
  deleteFood,
} = require("../service/foods.service");

foodsRouter.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const foods = await getAllFoods(page, limit);
    res.json(foods);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

foodsRouter.get("/:id", async (req, res) => {
  try {
    const food = await getFoodById(req.params.id);

    res.json(food);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

foodsRouter.post("/", async (req, res) => {
  try {
    const { name, category, quantity, expirationDate, price } = req.body;
    const newFood = await createFood(
      name,
      category,
      quantity,
      expirationDate,
      price
    );
    res.status(201).json(newFood);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

foodsRouter.put("/:id", async (req, res) => {
  try {
    const updates = req.body;
    const updatedFood = await updateFood(req.params.id, updates);
    res.json(updatedFood);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

foodsRouter.delete("/:id", async (req, res) => {
  try {
    const result = await deleteFood(req.params.id);
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = foodsRouter;
