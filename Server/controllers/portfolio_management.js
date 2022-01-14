/* eslint-disable camelcase */
const asyncHandler = require('express-async-handler');
const persons = require('../model/portfolio_management');
const help_functions = require('../help_functions');

// Test Routen
const getUsers = asyncHandler(async (req, res) => {
  res.status(200).json(await persons.getUsers());
});
const getUserByEmail = asyncHandler(async (req, res) => {
  res.status(200).json((await persons.getUserByEmail(req.params.email))[0]);
});
const getUserById = asyncHandler(async (req, res) => {
  console.log(req.params.user_id);
  res.status(200).json((await persons.getUserById(req.params.user_id))[0]);
});
// Neuen User registrieren
const registerNewUser = asyncHandler(async (req, res) => {
  res.status(200).json(await persons.registerNewUser(req.body));
});
// Alle Competitions von einem User
const getUserCompetitions = asyncHandler(async (req, res) => {
  res
    .status(200)
    .json(await persons.getCompetitionsByUser(req.session.user.user_id));
});
// Erstellen einer neuen Competition
const createNewCompetition = asyncHandler(async (req, res) => {
  req.body.code = help_functions.getRandomCode();
  req.body.creation_date = help_functions.getCurrentDate();
  if (req.body.starting_money == null) {
    req.body.starting_money = 'DEFAULT';
  }
  res.status(200).json(await persons.createNewCompetition(req.body));
});
// Alle Aktien in einem Depot
const getStocksFromDepot = asyncHandler(async (req, res) => {
  res.status(200).json(await persons.getStocksFromDepot(req.params.member_id));
});
// Login Route
const loginUser = asyncHandler(async (req, res) => {
  const user = await persons.loginUser(req.body);
  if (!user) {
    req.session.user = null;
    res.status(402).json('User not Found');
    return;
  }
  console.log('user Logged in');
  console.log(user);
  req.session.user = user;
  res.status(200).json(user);
});

const getUserData = asyncHandler(async (req, res) => {
  console.log(req.session.user);
  res.status(200).json(req.session.user);
});
const buyStocks = asyncHandler(async (req, res) => {
  res
    .status(200)
    .json(await persons.buyStocks(req.body, req.session.user.user_id));
});

module.exports = {
  getUsers,
  getUserById,
  getUserByEmail,
  registerNewUser,
  createNewCompetition,
  getStocksFromDepot,
  loginUser,
  getUserData,
  getUserCompetitions,
  buyStocks,
};
