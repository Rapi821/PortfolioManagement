const express = require('express');
const {
  getUsers,
  getUserByEmail,
  registerNewUser,
  getCompetitionsByUser,
  createNewCompetition,
  getStocksFromDepot
} = require('../controllers/portfolio_management');

const router = express.Router();

//Test Routen
router.get('/users', getUsers);
router.get('/user/:email',getUserByEmail);
//Neuen User registrieren
router.post('/user/createNewOne',registerNewUser);
//Alle Competitions von einem User
router.get('/getCompetitions/:user_id', getCompetitionsByUser);
//Erstellen einer neuen Competition  
router.post('/createNewCompetition', createNewCompetition); 
//Alle Aktien in einem Depot 
router.get('/competitions/:member_id', getStocksFromDepot);
module.exports = router;
