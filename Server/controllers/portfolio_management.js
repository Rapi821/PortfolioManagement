const asyncHandler = require('express-async-handler');
const persons = require('../model/portfolio_management');

//Test Routen
const getUsers = asyncHandler(async (req, res) => {
  res.status(200).json(await persons.getUsers());
});
const getUserByEmail = asyncHandler(async (req, res) => {
  res.status(200).json((await persons.getUserByEmail(req.params.email))[0]);
});
//Neuen User registrieren
const registerNewUser = asyncHandler(async (req, res) => {
  res.status(200).json((await persons.registerNewUser(req.body))[0]);
});
//Alle Competitions von einem User
let user_id= 1;
const getCompetitionsByUser = asyncHandler(async (req, res) => {
  res.status(200).json(await persons.getCompetitionsByUser(user_id));
});

module.exports = {
  getUsers,
  getUserByEmail,
  registerNewUser,
  getCompetitionsByUser
};
