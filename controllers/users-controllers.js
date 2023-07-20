const { v4: uuidv4 } = require("uuid");
const { validationResult } = require("express-validator");
const HttpError = require("../models/http-error");

const DUMMY_USERS = [
  {
    id: "u1",
    name: "MAx Schwarz",
    email: "max@gmail.com",
    password: "testers",
  },
];

const getUsers = (req, res, next) => {
  res.json({ users: DUMMY_USERS });
};
const signup = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new HttpError("Invalid inputs pasees, please check your data", 422);
    }
  const { name, email, password } = req.body;
  const hasUser = DUMMY_USERS.find((u) => u.email === email);
  if (hasUser) {
    throw new HttpError("Could not create user, user already exists.", 422);
  }
  const createdUser = {
    id: uuidv4(),
    name,
    email,
    password,
  };

  DUMMY_USERS.push(createdUser);
  res.status(201).json({ user: createdUser });
};
const login = (req, res, next) => {
  const { email, password } = req.body;
  const identifiedUser = DUMMY_USERS.find((u) => u.email === email);
  if (!identifiedUser || identifiedUser.password !== password) {
    throw new HttpError(
      "Could not identify user, credentials seem to be wrong,",
      404
    );
  }
  res.json({ message: "Logged in!" });
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
