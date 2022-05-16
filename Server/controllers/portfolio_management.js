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
  // console.log(req.params.user_id);
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
  let buyPrice = await persons.getstockValue(req.session.user.user_id);
  let erg;
  let stockV = [];
  for (let i in base) {
    base.find((e) => e.competition_id == cash[i].competition_id).cash = cash[i].cash;

    if (buyPrice[i] != undefined) {
      base.find((e) => e.competition_id == buyPrice[i].competition_id).portfolio_value =
        buyPrice[i].sum;
    }
  }
  for (const i of base) {
    if (!i.hasOwnProperty('portfolio_value')) {
      i.portfolio_value = 0;
    }
  }
  res.status(200).json(base);
});
// Erstellen einer neuen Competition
const createNewCompetition = asyncHandler(async (req, res) => {
  req.body.code = help_functions.getRandomCode();
  req.body.creation_date = help_functions.getCurrentDate();
  if (req.body.starting_money < 100) {
    req.body.starting_money = 100000;
  }
  if (req.body.end_date == undefined || req.body.end_date == '') {
    req.body.end_date = null;
  }
  await persons.createNewCompetition(req.body, req.session.user.user_id);
  res.status(200).json(await persons.addUserToCompetition(req.body, req.session.user.user_id));
});
// User einer neuen Competition hinzufügen
const addUserToCompetition = asyncHandler(async (req, res) => {
  req.body.creation_date = help_functions.getCurrentDate(); //creation_date ist der Tag an dem der User beitritt
  console.log(req.body);
  res.status(200).json(await persons.addUserToCompetition(req.body, req.session.user.user_id));
});
// Alle Aktien in einem Depot
const getStocksFromDepot = asyncHandler(async (req, res) => {
  res
    .status(200)
    .json(await persons.getStocksFromDepot(req.params.competition_id, req.session.user.user_id));
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
  console.log(req.session);
  req.session.user = user;
  res.status(200).json(user);
});
// Logout User
const logoutUser = asyncHandler(async (req, res) => {
  req.session.user = null;
  console.log('user logged out');
  res.status(200).send('User logged Out');
});

const getUserData = asyncHandler(async (req, res) => {
  // console.log(req.session.user);
  res.status(200).json(req.session.user);
});
const buyStocks = asyncHandler(async (req, res) => {
  req.body.buy_date = help_functions.getCurrentDate();
  req.body.buysell = 'buy';
  if ((await persons.checkStockBought(req.body, req.session.user.user_id)).count != 1) {
    await persons.buyNewStocks(req.body, req.session.user.user_id);
  } else {
    await persons.rebuyStocks(req.body, req.session.user.user_id);
  }
  await persons.removeMoney(req.body, req.session.user.user_id);
  res.status(200).json(await persons.addToRecords(req.body, req.session.user.user_id));
});

const getCompetition = asyncHandler(async (req, res) => {
  // console.log(req.session);
  res
    .status(200)
    .json(await persons.getCompetition(req.params.competition_id, req.session.user.user_id));
});

const sellStocks = asyncHandler(async (req, res) => {
  // console.log(req.body);
  req.body.buy_date = help_functions.getCurrentDate();
  req.body.buysell = 'sell';
  if (
    (await persons.getStackCount(req.body, req.session.user.user_id))[0].count - req.body.count >=
    0
  ) {
    await persons.sellStocks(req.body, req.session.user.user_id);
    req.body.buy_price = req.body.sell_price;
    await persons.addMoney(req.body, req.session.user.user_id);
    res.status(200).json(await persons.addToRecords(req.body, req.session.user.user_id));
  }
});
const getRanking = asyncHandler(async (req, res) => {
  res.status(200).json(await persons.getRanking(req.params.competition_id));
});

const getRecords = asyncHandler(async (req, res) => {
  res
    .status(200)
    .json(await persons.getRecords(req.params.competition_id, req.session.user.user_id));
});

const changeStatus = asyncHandler(async (req, res) => {
  res.status(200).json(await persons.changeStatus(req.params.competition_id, req.body));
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
  addUserToCompetition,
  getCompetition,
  sellStocks,
  getRanking,
  getRecords,
  logoutUser,
  changeStatus,
};
