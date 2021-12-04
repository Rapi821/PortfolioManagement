const asyncHandler = require('express-async-handler');
const persons = require('../model/portfolio_management');
const help_functions= require('../help_functions');

//Test Routen
const getUsers = asyncHandler(async (req, res) => {
  res.status(200).json(await persons.getUsers());
});
const getUserByEmail = asyncHandler(async (req, res) => {
  res.status(200).json((await persons.getUserByEmail(req.params.email))[0]);
});
//Neuen User registrieren
const registerNewUser = asyncHandler(async (req, res) => {
  res.status(200).json((await persons.registerNewUser(req.body)));
});
//Alle Competitions von einem User
const getCompetitionsByUser = asyncHandler(async (req, res) => {
  res.status(200).json(await persons.getCompetitionsByUser(req.params.user_id));
});
//Erstellen einer neuen Competition
const createNewCompetition = asyncHandler(async (req, res) => {
  req.body.code = help_functions.getRandomCode();
  req.body.creation_date= help_functions.getCurrentDate();
  if(req.body.starting_money == null){
    req.body.starting_money= 'DEFAULT';
  }
  res.status(200).json((await persons.createNewCompetition(req.body)));
});
//Alle Aktien in einem Depot
const getStocksFromDepot = asyncHandler(async (req, res) => {
  res.status(200).json(await persons.getStocksFromDepot(req.params.member_id));
});

module.exports = {
  getUsers,
  getUserByEmail,
  registerNewUser,
  getCompetitionsByUser,
  createNewCompetition,
  getStocksFromDepot
};
