const router = require("express").Router();
const UserController = require("../controllers/UserController");

// middlewares
const verifyToken = require("../helpers/verify-token");
const { imageUpload } = require("../helpers/image-uploads");
const userValidations = require("../helpers/user-validations");

router.post("/register", userValidations, UserController.register);
router.post("/login", UserController.login);
router.get("/checkuser", UserController.checkUser);
router.get("/:id", UserController.getUserById);
router.patch(
  "/edit/:id",
  verifyToken,

  imageUpload.single("image"),
  UserController.editUser
);

module.exports = router;
