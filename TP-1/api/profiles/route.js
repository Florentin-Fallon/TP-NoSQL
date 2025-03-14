const { Router } = require("express");
const controller = require("./controller");

const router = Router();

// CRUD Routes

// CREATE
router.post("/", controller.createProfile);

// CREATE experience
router.post("/:id/experience", controller.addExperience);

// CREATE skills
router.post("/:id/skills", controller.addSkills);

// READ all profiles
router.get("/", controller.getProfiles);

// READ single profile
router.get("/:id", controller.getProfileById);

// READ experience of a profile
router.get("/:id/experience", controller.getExperience);

// UPDATE profile
router.put("/:id", controller.updateProfile);

// UPDATE information
router.put("/:id/information", controller.updateInformation);

// DELETE profile
router.delete("/:id", controller.deleteProfile);

// DELETE experience
router.delete("/:id/experience/:exp", controller.deleteExperience);

module.exports = router;
