require("dotenv").config();

const mongoose = require("./mongodb");
const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const ProfilesRoutes = require("./api/profiles");

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/profiles", ProfilesRoutes);

app.listen(port, () => {
  console.log(`Le site tourne sur localhost:${port}`);
});
