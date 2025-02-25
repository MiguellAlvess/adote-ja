const { body } = require("express-validator");

const validatePet = [
  body("images").custom((value, { req }) => {
    if (req.method === "POST" && (!req.files || req.files.length === 0)) {
      throw new Error("Pelo menos uma imagem é obrigatória");
    }
    return true;
  }),
  body("name").notEmpty().withMessage("O nome é obrigatório"),
  body("age").isInt({ min: 0 }).withMessage("A idade é obrigatória"),
  body("weight").isFloat({ min: 0 }).withMessage("O peso é obrigatório"),
  body("color").notEmpty().withMessage("A cor é obrigatória"),
];

module.exports = validatePet;
