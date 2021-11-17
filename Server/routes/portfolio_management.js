const express = require('express');
const {
  getUsers,
  getUserByEmail
} = require('../controllers/portfolio_management');

const router = express.Router();

router.get('/users', getUsers);
router.get('/user/:email',getUserByEmail);

  
module.exports = router;
