const ProfileModel = require("./model");

// CREATE
const createProfile = async (req, res) => {
  try {
    const {
      name,
      email,
      experience = [],
      skills = [],
      information = {},
    } = req.body;
    const profileToSave = new ProfileModel({
      name,
      email,
      experience,
      skills,
      information,
    });
    const createdProfile = await profileToSave.save();
    res.status(201).json(createdProfile);
  } catch (error) {
    res.status(400).json({ message: "Error creating profile", error });
  }
};

// POST /:id/experience
const addExperience = async (req, res) => {
  const { id } = req.params;
  const { titre, entreprise, dates, description } = req.body; // Récupération de tous les champs nécessaires

  try {
    const profile = await ProfileModel.findById(id); // Recherche du profil
    if (!profile) return res.status(404).json({ message: "Profile not found" });

    // Créer une nouvelle expérience avec les champs requis
    const experience = {
      titre,
      entreprise,
      dates,
      description, // La description est optionnelle et peut être vide
    };

    // Ajouter l'expérience au profil
    profile.experience.push(experience);
    await profile.save();

    res.status(200).json(profile.experience); // Retourner l'expérience ajoutée
  } catch (error) {
    res.status(400).json({ message: "Error adding experience", error });
  }
};

// POST /:id/skills
const addSkills = async (req, res) => {
  const { id } = req.params;
  const { skill } = req.body;

  try {
    const profile = await ProfileModel.findById(id);
    if (!profile) return res.status(404).json({ message: "Profile not found" });

    // Vérifier si 'skill' est un tableau et ajouter les compétences
    if (Array.isArray(skill)) {
      profile.skills = [...new Set([...profile.skills, ...skill])]; // Ajoute toutes les nouvelles compétences sans doublons
    } else {
      if (!profile.skills.includes(skill)) {
        profile.skills.push(skill);
      }
    }

    await profile.save();
    res.status(200).json(profile.skills);
  } catch (error) {
    res.status(400).json({ message: "Error adding skill", error });
  }
};

// GET /
const getProfiles = async (req, res) => {
  try {
    const profiles = await ProfileModel.find({ isDeleted: { $ne: true } });
    res.status(200).json(profiles);
  } catch (error) {
    res.status(400).json({ message: "Error fetching profiles", error });
  }
};

// GET /:id
const getProfileById = async (req, res) => {
  const { id } = req.params;
  try {
    const profile = await ProfileModel.findOne({
      _id: id,
      isDeleted: { $ne: true },
    });
    if (!profile) return res.status(404).json({ message: "Profile not found" });
    res.status(200).json(profile);
  } catch (error) {
    res.status(400).json({ message: "Error fetching profile", error });
  }
};

// GET /:id/experience
const getExperience = async (req, res) => {
  const { id } = req.params;
  try {
    const profile = await ProfileModel.findOne(
      { _id: id, isDeleted: { $ne: true } },
      "experience"
    );
    if (!profile) return res.status(404).json({ message: "Profile not found" });
    res.status(200).json(profile.experience);
  } catch (error) {
    res.status(400).json({ message: "Error fetching experiences", error });
  }
};

// PUT /:id
const updateProfile = async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;

  try {
    const profile = await ProfileModel.findByIdAndUpdate(
      id,
      { name, email },
      { new: true }
    );
    if (!profile) return res.status(404).json({ message: "Profile not found" });
    res.status(200).json(profile);
  } catch (error) {
    res.status(400).json({ message: "Error updating profile", error });
  }
};

// PUT /:id/information
const updateInformation = async (req, res) => {
  const { id } = req.params;
  const { information } = req.body;

  try {
    // Trouver et mettre à jour le profil avec les nouvelles informations
    const profile = await ProfileModel.findByIdAndUpdate(
      id,
      { information }, // Mise à jour de l'objet information
      { new: true } // Retourne le profil mis à jour
    );

    // Si le profil n'est pas trouvé
    if (!profile) return res.status(404).json({ message: "Profile not found" });

    // Retourner le profil mis à jour
    res.status(200).json(profile);
  } catch (error) {
    res.status(400).json({ message: "Error updating information", error });
  }
};

// DELETE /:id
const deleteProfile = async (req, res) => {
  const { id } = req.params;

  try {
    const profile = await ProfileModel.findByIdAndUpdate(
      id,
      { isDeleted: true }, // Marque le profil comme supprimé
      { new: true }
    );

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.status(200).json({ message: "Profile marked as deleted", profile });
  } catch (error) {
    res.status(400).json({ message: "Error deleting profile", error });
  }
};

// DELETE /:id/experience/:exp
const deleteExperience = async (req, res) => {
  const { id, exp } = req.params;

  try {
    const updatedProfile = await ProfileModel.findByIdAndUpdate(
      id,
      { $pull: { experience: { _id: exp } } },
      { new: true }
    );

    if (!updatedProfile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    console.log("Profil après suppression:", updatedProfile);

    res.status(200).json({
      message: "Experience deleted",
      experience: updatedProfile.experience,
    });
  } catch (error) {
    console.log("Error deleting experience:", error);
    res.status(400).json({ message: "Error deleting experience", error });
  }
};

// DELETE /:id/skills/:skill
const deleteSkills = async (req, res) => {
  const { id, skill } = req.params;

  try {
    const profile = await ProfileModel.findById(id);
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    // Vérifier si la compétence existe
    const skillIndex = profile.skills.indexOf(skill);
    if (skillIndex === -1) {
      return res.status(404).json({ message: "Skill not found" });
    }

    // Supprimer la compétence
    profile.skills.splice(skillIndex, 1);
    await profile.save();

    res.status(200).json({ message: "Skill deleted", skills: profile.skills });
  } catch (error) {
    res.status(400).json({ message: "Error deleting skill", error });
  }
};

module.exports = {
  createProfile,
  addExperience,
  addSkills,
  getProfiles,
  getProfileById,
  getExperience,
  updateProfile,
  updateInformation,
  deleteProfile,
  deleteExperience,
  deleteSkills,
};
