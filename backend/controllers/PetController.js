const Pet = require("../models/Pet");

// helpers
const getToken = require("../helpers/get-token");
const getUserByToken = require("../helpers/get-user-by-token");

const ObjectId = require("mongoose").Types.ObjectId;
const { validationResult } = require("express-validator");

module.exports = class PetController {
  static async create(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const firstError = errors.array()[0].msg;
      return res.status(400).json({ message: firstError });
    }

    const { name, age, weight, color } = req.body;
    const available = true;
    const images = req.files;

    // get pet owner
    const token = getToken(req);
    const user = await getUserByToken(token);

    // create a pet
    const pet = new Pet({
      name,
      age,
      weight,
      color,
      available,
      images: [],
      user: {
        _id: user._id,
        name: user.name,
        image: user.image,
        phone: user.phone,
      },
    });

    images.map((image) => {
      pet.images.push(image.filename);
    });

    try {
      const newPet = await pet.save();
      res.status(201).json({ message: "Pet cadastrado com sucesso!", newPet });
    } catch (err) {
      res.status(500).json({ message: err });
    }
  }
  static async getAll(req, res) {
    const pets = await Pet.find().sort("-createdAt");

    res.status(200).json({ pets });
  }

  static async getAllUserPets(req, res) {
    // get user from token

    const token = getToken(req);
    const user = await getUserByToken(token);

    const pets = await Pet.find({ "user._id": user._id }).sort("-createdAt");

    res.status(200).json({ pets });
  }

  static async getAllUserAdoptions(req, res) {
    // get user from token

    const token = getToken(req);
    const user = await getUserByToken(token);

    const pets = await Pet.find({ "adopter._id": user._id }).sort("-createdAt");

    res.status(200).json({ pets });
  }

  static async getPetById(req, res) {
    const id = req.params.id;

    // check if id is valid
    if (!ObjectId.isValid(id)) {
      res.status(422).json({ message: "ID inválido!" });
      return;
    }

    // check if pets exists
    const pet = await Pet.findOne({ _id: id });

    if (!pet) {
      res.status(404).json({ message: "Pet não encontrado!" });
    }

    res.status(200).json({ pet });
  }

  static async removePetById(req, res) {
    const id = req.params.id;

    // check if id is valid
    if (!ObjectId.isValid(id)) {
      res.status(422).json({ message: "ID inválido!" });
      return;
    }

    // check if pets exists
    const pet = await Pet.findOne({ _id: id });

    if (!pet) {
      res.status(404).json({ message: "Pet não encontrado!" });
      return;
    }

    // check if logged in user registered the pet

    const token = getToken(req);
    const user = await getUserByToken(token);

    // transformando em string para ser o mesmo tipo de dado pra os dois
    if (pet.user._id.toString() !== user._id.toString()) {
      res
        .status(422)
        .json({ message: "Houve um problema. Tente novamente mais tarde!" });
      return;
    }

    await Pet.findByIdAndDelete(id);

    res.status(200).json({ message: "Pet removido com sucesso!" });
  }

  static async updatePet(req, res) {
    const id = req.params.id;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const firstError = errors.array()[0].msg;
      return res.status(400).json({ message: firstError });
    }

    const { name, age, weight, color, available } = req.body;
    const images = req.files;
    const updatedData = {};

    // check if pets exists
    const pet = await Pet.findOne({ _id: id });
    if (!pet) {
      return res.status(404).json({ message: "Pet não encontrado!" });
    }

    // check if logged in user registered the pet
    const token = getToken(req);
    const user = await getUserByToken(token);

    if (pet.user._id.toString() !== user._id.toString()) {
      return res
        .status(422)
        .json({ message: "Houve um problema. Tente novamente mais tarde!" });
    }

    updatedData.name = name;
    updatedData.age = age;
    updatedData.weight = weight;
    updatedData.color = color;

    if (images.length > 0) {
      updatedData.images = [];
      images.map((image) => {
        updatedData.images.push(image.filename);
      });
    }

    await Pet.findByIdAndUpdate(id, updatedData);
    res.status(200).json({ message: "Pet atualizado com sucesso!" });
  }

  static async schedule(req, res) {
    const id = req.params.id;

    // check if pets exists
    const pet = await Pet.findOne({ _id: id });

    if (!pet) {
      res.status(404).json({ message: "Pet não encontrado!" });
      return;
    }

    // check if user registered the pet

    const token = getToken(req);
    const user = await getUserByToken(token);

    if (pet.user._id.equals(user._id)) {
      res.status(422).json({
        message: "Você não pode agendar uma visita com seu próprio pet!",
      });
      return;
    }

    // check if user has already scheduled a visit

    if (pet.adopter) {
      if (pet.adopter._id.equals(user._id)) {
        res.status(422).json({
          message: "Você já agendou uma visita para esse pet!",
        });
        return;
      }
    }

    // add user to pet

    pet.adopter = {
      _id: user._id,
      name: user.name,
      image: user.image,
    };

    await Pet.findByIdAndUpdate(id, pet);

    res
      .status(200)
      .json({
        message: `A visita foi agendada com sucesso. Entre em contato ${pet.user.name} pelo ${pet.user.phone}`,
      });
  }

  static async concludeAdoption(req, res) {
    const id = req.params.id;

    // check if pets exists
    const pet = await Pet.findOne({ _id: id });

    if (!pet) {
      res.status(404).json({ message: "Pet não encontrado!" });
      return;
    }

    // check if logged in user registered the pet

    const token = getToken(req);
    const user = await getUserByToken(token);

    if (pet.user._id.toString() !== user._id.toString()) {
      res
        .status(422)
        .json({ message: "Houve um problema. Tente novamente mais tarde!" });
      return;
    }

    pet.available = false;

    await Pet.findByIdAndUpdate(id, pet);

    res
      .status(200)
      .json({
        message: "Parabéns! O clico de adoção foi finalizado com sucesso",
      });
  }
};
