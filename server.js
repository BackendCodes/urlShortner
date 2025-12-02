const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const connectDB = require("./config/db");
const urlRoutes = require("./routes/url");
const cookies = require("cookie-parser");
const app = express();

const userRoutes = require("./routes/user");
const StaticRoutes = require("./routes/staticRoutes");
const restrictToLoogedinUserOnly = require("./middlewares/checkauth");

connectDB();

// Set EJS as view engine
app.set("view engine", "ejs");

app.use(cookies());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PORT = process.env.PORT;

app.use("/", StaticRoutes);

app.use("/auth", userRoutes);

app.use("/url",urlRoutes);

app.listen(PORT, () =>
  console.log(`Server running on port http://localhost:${PORT}/`)
);
