const express = require("express");
const cors = require("cors");
require("dotenv").config();

const sequelize = require("./src/config/db");
require("./src/models/User");
require("./src/models/Activity");

const authRoutes = require("./src/routes/auth");
const activityRoutes = require("./src/routes/activities");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/activities", activityRoutes);

sequelize.sync({ alter: true })
  .then(() => console.log("Banco sincronizado!"))
  .catch(err => console.error("Erro DB:", err));

app.listen(3001, () => console.log("Servidor rodando na porta 3001"));
