const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

// helpers
const createUserToken = require("../helpers/create-user-token");
const getToken = require("../helpers/get-token");
const getUserByToken = require("../helpers/get-user-by-token");

module.exports = class UserController {
  static async register(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const firstError = errors.array()[0].msg;
      return res.status(400).json({ message: firstError });
    }

    const { name, email, phone, password, confirmpassword } = req.body;

    const userExists = await User.findOne({ email: email });
    if (userExists) {
      return res.status(409).json({ message: "Este email já foi cadastrado" }); // 409 para conflito
    }

    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    const user = new User({
      name,
      email,
      phone,
      password: passwordHash,
    });

    try {
      const newUser = await user.save();
      await createUserToken(newUser, req, res);
    } catch (error) {
      res.status(500).json({ message: "Erro ao registrar o usuário" }); // 500 para erros internos
    }
  }

  static async login(req, res) {
    const { email, password } = req.body;

    // validation

    if (!email) {
      res.status(422).json({ message: "O email é obrigatório" });
      return;
    }
    if (!password) {
      res.status(422).json({ message: "A senha é obrigatória" });
      return;
    }

    // check if user exists

    const user = await User.findOne({ email: email });

    if (!user) {
      res
        .status(422)
        .json({ message: "Não há usuário cadastrado com esse email" });
      return;
    }

    // check if password match with db password

    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      res.status(422).json({ message: "A senha está incorreta" });
      return;
    }

    await createUserToken(user, req, res);
  }
  static async checkUser(req, res) {
    let currentUser;

    if (req.headers.authorization) {
      const token = getToken(req);

      const decoded = jwt.verify(token, "mysecret");
      currentUser = await User.findById(decoded.id);

      currentUser.password = undefined;
    } else {
      currentUser = null;
    }

    res.status(200).send(currentUser);
  }

  static async getUserById(req, res) {
    const id = req.params.id;

    const user = await User.findById(id).select("-password");

    if (!user) {
      res.status(422).json({ message: "Usuário não encontrado!" });
      return;
    }

    res.status(200).json({ user });
  }

  static async editUser(req, res) {
    const id = req.params.id;

    // check if user exists
    const token = getToken(req);
    const user = await getUserByToken(token);

    const { name, email, phone, password, confirmpassword } = req.body;

    // image

    if (req.file) {
      user.image = req.file.filename;
    }

    // validations

    if (!name) {
      res.status(422).json({ message: "O nome é obrigatório" });
      return;
    }

    user.name = name;

    if (!email) {
      res.status(422).json({ message: "O email é obrigatório" });
      return;
    }

    // check if email has already taker
    const userExists = await User.findOne({ email: email });

    if (user.email !== email && userExists) {
      res.status(422).json({ message: "Utilize outro email." });
      return;
    }

    user.email = email;

    if (!phone) {
      res.status(422).json({ message: "O telefone é obrigatório" });
      return;
    }

    user.phone = phone;

    if (password != confirmpassword) {
      res
        .status(422)
        .json({
          message: "A senha e a confirmação de senha precisam ser iguais",
        });
      return;
    } else if (password === confirmpassword && password != null) {
      // creating passowrd

      const salt = await bcrypt.genSalt(12);
      const passwordHash = await bcrypt.hash(password, salt);

      user.password = passwordHash;
    }

    try {
      // returns user updated data

      await User.findOneAndUpdate(
        { _id: user._id },
        { $set: user },
        { new: true }
      );

      res.status(200).json({ message: "Usuário atualizado com sucesso!" });
    } catch (err) {
      res.status(500).json({ message: err });
      return;
    }
  }
};
