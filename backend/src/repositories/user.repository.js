const User = require("../models/user.model");

const findByEmail = (email) => User.findOne({ email });
const findById = (id) => User.findById(id);
const findByActivationToken = (token) => User.findOne({ activationToken: token });
const findByResetToken = (token) =>
  User.findOne({ resetPasswordToken: token, resetPasswordExpires: { $gt: Date.now() } });
const createUser = (data) => new User(data).save();



module.exports = {
  findByEmail,
  findById,
  findByActivationToken,
  findByResetToken,
  createUser,
};
