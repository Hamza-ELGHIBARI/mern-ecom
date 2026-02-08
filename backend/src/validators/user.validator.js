const Joi = require("joi");

// Pour addUser et editUser (édition plus souple sur edit)
const userSchema = Joi.object({
  firstName: Joi.string()
    .min(2)
    .max(50)
    .required()
    .messages({
      "string.base": "Prénom doit être une chaîne de caractères",
      "string.empty": "Prénom est requis",
      "string.min": "Prénom doit contenir au moins {#limit} caractères",
      "string.max": "Prénom doit contenir au maximum {#limit} caractères",
      "any.required": "Prénom est obligatoire",
    }),
  lastName: Joi.string()
    .min(2)
    .max(50)
    .required()
    .messages({
      "string.base": "Nom doit être une chaîne de caractères",
      "string.empty": "Nom est requis",
      "string.min": "Nom doit contenir au moins {#limit} caractères",
      "string.max": "Nom doit contenir au maximum {#limit} caractères",
      "any.required": "Nom est obligatoire",
    }),
  email: Joi.string()
    .email()
    .required()
    .messages({
      "string.email": "Adresse email invalide",
      "any.required": "Email est obligatoire",
    }),
  role: Joi.string()
    .valid("admin", "livreur")
    .required()
    .messages({
      "any.only": "Rôle invalide",
      "any.required": "Rôle est obligatoire",
    }),
  extraData: Joi.object().optional(),
});

// Pour editUser, tous les champs sont optionnels (on ne force pas tout)
const editUserSchema = userSchema.fork(
  ["firstName", "lastName", "email", "role"],
  (field) => field.optional()
);

module.exports = {
  userSchema,
  editUserSchema,
};
