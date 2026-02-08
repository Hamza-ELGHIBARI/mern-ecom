const crypto = require("crypto");
const bcrypt = require("bcrypt");
const User = require("../models/user.model");
const Admin = require("../models/admin.model");
const Livreur = require("../models/livreur.model");
const sendEmail = require("../utils/email");
const userRepo = require("../repositories/user.repository");

// Lister tous les utilisateurs admin et livreur
const listUsers = async () => {
  // populate pour récupérer les données spécifiques de Admin ou Livreur
  const users = await User.find({ role: { $in: ["admin", "livreur"] } })
    .select("-password") // ne pas renvoyer le mot de passe
    .lean();
  return users;
};

// Ajouter un utilisateur admin ou livreur
const register = async ({ firstName, lastName, email, role, extraData, createdBy }) => {
  // Vérifie si l'email existe déjà
  const existing = await userRepo.findByEmail(email);
  if (existing) throw new Error("Email déjà utilisé");

  // Hash par défaut du mot de passe temporaire (sera changé par l'utilisateur)
  const tempPassword = crypto.randomBytes(6).toString("hex");
  const hashedPassword = await bcrypt.hash(tempPassword, 10);

  // Création du user actif
  const user = await userRepo.createUser({
    firstName,
    lastName,
    email,
    password: hashedPassword,
    role,
    createdBy: createdBy || null,
    isActive: true, // actif immédiatement
  });

  // Création du document spécifique selon le rôle
  if (role === "admin") {
    await Admin.create({ userId: user._id, permissions: extraData?.permissions || [] });
  } else if (role === "livreur") {
    await Livreur.create({
      userId: user._id,
      vehicle: extraData?.vehicle,
      licenseNumber: extraData?.licenseNumber,
      plateNumber: extraData?.plateNumber,
    });
  }

  // Génération du token pour réinitialiser le mot de passe
  const resetToken = crypto.randomBytes(32).toString("hex");
  user.resetPasswordToken = resetToken;
  user.resetPasswordExpires = Date.now() + 3600 * 1000; // 1h
  await user.save();

  // Envoi du mail pour configurer le mot de passe
  const resetLink = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
  await sendEmail(
    email,
    "Bienvenue sur la plateforme – Configurez votre mot de passe",
    `Bonjour ${firstName},\n\nVotre compte a été créé par un administrateur. Cliquez sur le lien ci-dessous pour configurer votre mot de passe :\n\n${resetLink}\n\nLe lien expire dans 1 heure.`
  );

  return user;
};

// Modifier un utilisateur admin ou livreur
const updateUser = async (userId, { firstName, lastName, email, password, role, extraData }) => {
  const user = await userRepo.findById(userId);
  if (!user) throw new Error("Utilisateur non trouvé");

  if (email && email !== user.email) {
    const existing = await userRepo.findByEmail(email);
    if (existing) throw new Error("Email déjà utilisé");
    user.email = email;
  }

  if (firstName) user.firstName = firstName;
  if (lastName) user.lastName = lastName;
  if (password) user.password = await bcrypt.hash(password, 10);
  if (role) user.role = role;

  await user.save();

  // Mettre à jour les données spécifiques selon le rôle
  if (role === "admin") {
    const admin = await Admin.findOne({ userId: user._id });
    if (admin) {
      admin.permissions = extraData?.permissions || admin.permissions;
      await admin.save();
    }
  } else if (role === "livreur") {
    const livreur = await Livreur.findOne({ userId: user._id });
    if (livreur) {
      livreur.vehicle = extraData?.vehicle || livreur.vehicle;
      livreur.licenseNumber = extraData?.licenseNumber || livreur.licenseNumber;
      livreur.plateNumber = extraData?.plateNumber || livreur.plateNumber;
      await livreur.save();
    }
  }

  return user;
};

module.exports = {
  listUsers,
  register,
  updateUser,
};
