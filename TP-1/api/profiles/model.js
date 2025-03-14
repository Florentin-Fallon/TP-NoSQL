const { Schema, model } = require("mongoose");

// Définition du schéma pour l'expérience
const experienceSchema = new Schema(
  {
    titre: { type: String, required: true },
    entreprise: { type: String, required: true },
    dates: { type: String, required: true },
    description: { type: String, default: "" }, // Description optionnelle
  },
  { _id: true } // Cela permet de garder un ID pour chaque expérience
);

// Définition du schéma pour le profil utilisateur
const ProfileSchema = new Schema(
  {
    name: { type: String, required: true }, // Nom requis
    email: { type: String, required: true, unique: true }, // Email requis et unique
    experience: [experienceSchema], // Liste d'expériences
    skills: { type: [String], default: [] }, // Liste de compétences
    information: {
      bio: { type: String, default: "" }, // Bio de l'utilisateur
      localisation: { type: String, default: "" }, // Localisation
      siteWeb: { type: String, default: "" }, // Site Web
    },
  },
  { timestamps: true } // Ajoute createdAt et updatedAt automatiquement
);

// Création du modèle Mongoose
const Profile = model("Profile", ProfileSchema);

module.exports = Profile;
