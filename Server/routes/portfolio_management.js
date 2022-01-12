const express = require('express');
const {
  getUsers,
  getUserByEmail,
  getUserById,
  registerNewUser,
  getUserCompetitions,
  createNewCompetition,
  getStocksFromDepot,
  loginUser,
  getUserData,
  buyStocks,
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
router.get('/user/data', getUserData);
router.get('/user/competitions', getUserCompetitions); 
router.post('/user/buyStocks', buyStocks);
module.exports = router;
