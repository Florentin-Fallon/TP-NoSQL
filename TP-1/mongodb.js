// mongodb.js
const mongoose = require("mongoose");
require("dotenv").config(); // Charger les variables d'environnement depuis le fichier .env

const mongoUri = process.env.MONGO_URI; // Récupérer l'URI de MongoDB

mongoose
  .connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connecter sur MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

module.exports = mongoose;
