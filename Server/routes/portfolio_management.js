const express = require('express');
const {
  getUsers,
  getUserByEmail,
  registerNewUser,
  getCompetitionsByUser
} = require('../controllers/portfolio_management');

const router = express.Router();

//Test Routen
router.get('/users', getUsers);
router.get('/user/:email',getUserByEmail);
//Neuen User registrieren
router.post('/user/createNewOne',registerNewUser);
//Alle Competitions von einem User
router.get('/users/competitions', getCompetitionsByUser);
  
module.exports = router;
