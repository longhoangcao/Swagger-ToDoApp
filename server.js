require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { Sequelize } = require("sequelize");
const db = require("./models");
const todoRoutes = require("./routes/todoRoutes");
const swaggerDocs = require("./swagger");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/api/todos", todoRoutes);

// Kích hoạt Swagger Docs
swaggerDocs(app);

const PORT = process.env.PORT || 5000;

db.sequelize.sync().then(() => {
  console.log("Database connected!");
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
