const router = require("express").Router();

const PetController = require("../controllers/PetController");

// middlweres
const verifyToken = require("../helpers/verify-token");
const { imageUpload } = require("../helpers/image-uploads");
const petValidations = require("../helpers/pet-validations");

router.post(
  "/create",
  verifyToken,
  imageUpload.array("images"),
  petValidations,
  PetController.create
);
router.get('/', PetController.getAll)
router.get('/mypets', verifyToken, PetController.getAllUserPets)
router.get('/myadoptions', verifyToken, PetController.getAllUserAdoptions)
router.get('/:id', PetController.getPetById)
router.delete('/:id', verifyToken, PetController.removePetById)
router.patch('/:id', verifyToken, imageUpload.array("images"), petValidations, PetController.updatePet)
router.patch('/schedule/:id', verifyToken, PetController.schedule)
router.patch('/conclude/:id', verifyToken, PetController.concludeAdoption)


module.exports = router;
