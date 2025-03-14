const { Router } = require("express");
const router = Router();
const controller = require("./controller");

// CREATE Routes
router.post("/", controller.createProfile); // Créer un profil (nom, email uniquement)
router.post("/:id/experience", controller.addExperience); // Ajouter une expérience à un profil
router.post("/:id/skills", controller.addSkills); // Ajouter une compétence à un profil

// READ Routes
router.get("", controller.getProfiles); // Récupérer tous les profils
router.get("/:id", controller.getProfileById); // Récupérer un profil par ID
router.get("/:id/experience", controller.getExperience); // Récupérer les expériences d'un profil

// UPDATE Routes
router.put("/:id", controller.updateProfile); // Mettre à jour un profil (uniquement nom, email)
router.put("/:id/information", controller.updateInformation); // Mettre à jour les informations du profil

// DELETE Routes (Soft-Delete pour le profil)
router.delete("/:id", controller.deleteProfile); // Supprimer un profil (soft-delete)
router.delete("/:id/experience/:exp", controller.deleteExperience); // Supprimer une expérience d'un profil
router.delete("/:id/skills/:skill", controller.deleteSkills); // Supprimer une compétence d'un profil

module.exports = router;
