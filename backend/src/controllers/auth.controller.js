const authService = require("../services/auth.service");
const jwt = require("jsonwebtoken");
const userRepo = require("../repositories/user.repository");

const register = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password, role, extraData } = req.body;
    const createdBy = req.user?._id || null; // si admin crée admin/livreur
    await authService.register({ firstName, lastName, email, password, role, extraData, createdBy });
    res.status(201).json({ message: "Compte créé. Vérifiez votre email pour l'activation." });
  } catch (err) {
    next(err);
  }
};

const activateAccount = async (req, res, next) => {
  try {
    await authService.activateAccount(req.params.token);
    res.json({ message: "Compte activé !" });
  } catch (err) {
    next(err); 
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = await authService.login({ email, password } );
    res.json(result);
  } catch (err) {
    next(err); 
  }
};

const forgotPassword = async (req, res, next) => {
  try {
    await authService.forgotPassword(req.body.email);
    res.json({ message: "Email de réinitialisation envoyé !" });
  } catch (err) {
    next(err); 
  }
};

const resetPassword = async (req, res, next) => {
  try {
    await authService.resetPassword(req.params.token, req.body.password);
    res.json({ message: "Mot de passe réinitialisé !" });
  } catch (err) {
    next(err); 
  }
};

const verifyToken = async (req, res, next) => {
  res.json({ message: "Token valide", user: req.user });
};

const getCurrentUser = async (req, res, next) => {
  res.json({ user: req.user });
};

module.exports = {
  register,
  activateAccount,
  login,
  forgotPassword,
  resetPassword,
  verifyToken,
  getCurrentUser,
};
