const express = require('express');
const {
  getUsers,
  // eslint-disable-next-line no-unused-vars
  getUserByEmail,
  getUserById,
  registerNewUser,
  getUserCompetitions,
  createNewCompetition,
  getStocksFromDepot,
  loginUser,
  getUserData,
  buyStocks,
  addUserToCompetition,
} = require('../controllers/portfolio_management');

const router = express.Router();

// Test Routen
router.get('/users', getUsers);
// router.get('/user/:email', getUserByEmail);
router.get('/users/:user_id', getUserById);
// Neuen User registrieren
router.post('/user/createNewOne', registerNewUser);
// Alle Competitions von einem User
// router.get('/getCompetitions/:user_id', getCompetitionsByUser);
// Erstellen einer neuen Competition
router.post('/createNewCompetition', createNewCompetition);
// Alle Aktien in einem Depot
router.get('/competitions/:member_id', getStocksFromDepot);
// Login Route
router.post('/user/login', loginUser);
// Route um Daten vonm eingeloggten User zu bekommen
router.get('/user/data', getUserData);
// Alle Competitions in denen der User bereits ist
router.get('/user/competitions', getUserCompetitions);
// Aktien kaufen
router.post('/user/buyStocks', buyStocks);
// Neuen User zu einer Competition hinzufügen
router.post('/user/addUserToCompetition', addUserToCompetition);
module.exports = router;
