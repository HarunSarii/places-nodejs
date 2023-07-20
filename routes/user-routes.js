const usersController = require("../controllers/users-controllers");
const express = require('express')

const router = express.Router();

router.get("/", usersController.getUsers);

router.post("/signup", usersController.signup);

router.post("/login", usersController.login);

module.exports = router;
