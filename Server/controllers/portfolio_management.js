const asyncHandler = require('express-async-handler');
const persons = require('../model/portfolio_management');
  
const getUsers = asyncHandler(async (req, res) => {
  res.status(200).json(await persons.getUsers());
});
const getUserByEmail = asyncHandler(async (req, res) => {
  res.status(200).json((await persons.getUserByEmail(req.params.email))[0]);
});

module.exports = {
  getUsers,
  getUserByEmail
};
