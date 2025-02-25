const { body } = require('express-validator');

const validateUser = [
  body('name').notEmpty().withMessage('O nome é obrigatório'),
  body('phone').matches(/^\(?\d{2}\)?[\s-]?\d{4,5}-?\d{4}$/).withMessage('Número de telefone inválido'),
  body('email').isEmail().withMessage('O email é inválido'),
  body('password').isLength({ min: 8 }).withMessage('A senha deve ter pelo menos 8 caracteres'),
  body('confirmpassword').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('A senha e a confirmação de senha precisam ser iguais');
    }
    return true;
  }),
];

module.exports = validateUser;