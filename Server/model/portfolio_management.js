const { query } = require('../db/index');

const getUsers = async () => (await query('SELECT * FROM users')).rows;
const getUserByEmail = async (email) => (await query('SELECT * FROM users WHERE email= $1', [email])).rows;

module.exports = {
  getUsers,
  getUserByEmail
};
