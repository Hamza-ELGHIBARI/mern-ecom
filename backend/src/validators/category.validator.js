const Joi = require("joi");

// Pour createCategory et updateCategory
const categorySchema = Joi.object({
  name: Joi.string()
    .min(2)
    .max(50)
    .required()
    .messages({
      "string.base": "Le nom doit être une chaîne de caractères",
      "string.empty": "Le nom est requis",
      "string.min": "Le nom doit contenir au moins {#limit} caractères",
      "string.max": "Le nom doit contenir au maximum {#limit} caractères",
      "any.required": "Le nom est obligatoire",
    }),
});

module.exports = { categorySchema };
