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
  let base = await persons.getCompetitionsByUser(req.session.user.user_id); 
  let cash = await persons.getCash(req.session.user.user_id);
  let stockValue= await persons.getstockValue(req.session.user.user_id);
  for (const i in base) {
    base[i].cash= cash[i].cash;
    base[i].portfolio_value= stockValue[i].stocksvalue;
  }
  console.log(base);
  res.status(200).json(base);

});
// Erstellen einer neuen Competition
const createNewCompetition = asyncHandler(async (req, res) => {
  req.body.code = help_functions.getRandomCode();
  req.body.creation_date = help_functions.getCurrentDate();
  if (req.body.starting_money < 100) {
    req.body.starting_money = DEFAULT;
  }
  if (req.body.end_date == undefined || req.body.end_date == "") {
    req.body.end_date = null;
  }
  res.status(200).json(await persons.createNewCompetition(req.body, req.session.user.user_id));
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
  if((persons.checkStockBought(req.body, req.session.user.user_id)) != 1){
    res.status(200).json(await persons.buyNewStocks(req.body, req.session.user.user_id));
  }
  else{
    res.status(200).json(await persons.rebuyStocks(req.body, req.session.user.user_id));
  } 
  res.status(200).json(await persons.removeMoney(req.body, req.session.user.user_id));
  res.status(200).json(await persons.addToRecords(req.body, req.session.user.user_id));
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
