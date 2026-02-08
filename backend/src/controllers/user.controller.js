const userService = require("../services/user.service");

// Liste tous les utilisateurs admin et livreur
const listUsers = async (req, res, next) => {
  try {
    const users = await userService.listUsers();
    res.json(users);
  } catch (err) {
    next(err);
  }
};

// Ajoute un utilisateur admin ou livreur
const addUser = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password, role, extraData } = req.body;

    // createdBy = admin qui crée le compte
    const createdBy = req.user._id;

    const user = await userService.register({
      firstName,
      lastName,
      email,
      password,
      role,
      extraData,
      createdBy,
    });

    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
};

// Modifier un utilisateur existant
const editUser = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const { firstName, lastName, email, password, role, extraData } = req.body;

    const user = await userService.updateUser(userId, {
      firstName,
      lastName,
      email,
      password,
      role,
      extraData,
    });

    res.json(user);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  listUsers,
  addUser,
  editUser,
};
