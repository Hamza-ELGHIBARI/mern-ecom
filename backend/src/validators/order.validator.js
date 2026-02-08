const Joi = require("joi");
const mongoose = require("mongoose");

// Validation ObjectId Mongo
const objectId = (value, helpers) => {
  if (!mongoose.Types.ObjectId.isValid(value)) {
    return helpers.message("ID produit invalide");
  }
  return value;
};

const orderItemSchema = Joi.object({
  productId: Joi.string()
    .custom(objectId)
    .required()
    .messages({
      "any.required": "Le produit est obligatoire",
    }),

  quantity: Joi.number()
    .integer()
    .min(1)
    .required()
    .messages({
      "number.base": "La quantité doit être un nombre",
      "number.min": "La quantité doit être au minimum 1",
      "any.required": "La quantité est obligatoire",
    }),
});

const createOrderSchema = Joi.object({
  addressIndex: Joi.number()
    .integer()
    .min(0)
    .required()
    .messages({
      "number.base": "L’index de l’adresse doit être un nombre",
      "number.min": "Index d’adresse invalide",
      "any.required": "L’adresse est obligatoire",
    }),

  items: Joi.array()
    .items(orderItemSchema)
    .min(1)
    .required()
    .messages({
      "array.min": "La commande doit contenir au moins un produit",
      "any.required": "Les items sont obligatoires",
    }),
});

module.exports = { createOrderSchema };
