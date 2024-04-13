require("dotenv").config();
const express = require("express");

const { connect } = require("./db/db");

const foodsRouter = require("./controller/foods.controller");

const { unknownEndpoint, errorHandler } = require("./utils/middleware");

const app = express();

connect();

app.use(express.json());

app.use("/api/foods", foodsRouter);

app.use(unknownEndpoint);
app.use(errorHandler);

module.exports = app;
