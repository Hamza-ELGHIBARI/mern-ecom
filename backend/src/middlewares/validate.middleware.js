const validate = (schema) => (req, res, next) => {
  const { error, value } = schema.validate(req.body, {
    abortEarly: false, // retourne toutes les erreurs
    stripUnknown: true, // supprime les champs inattendus
  });

  if (error) {
    return res.status(400).json({
      error: "Validation failed",
      details: error.details.map((d) => d.message),
    });
  }

  req.body = value; // payload nettoyé
  next();
};

module.exports = validate;
