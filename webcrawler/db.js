const { Pool } = require('pg');

require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DB_CONN_STRING,
  max: 3,
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
