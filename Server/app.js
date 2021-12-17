/* eslint-disable import/order */
/* eslint-disable no-unused-vars */
/* eslint-disable global-require */
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const path = require('path');
const persons = require('./routes/portfolio_management');
const { errorHandler, notFound } = require('./middleware/errorHandler');
const session = require('express-session');

require('colors');
require('dotenv').config();

const app = express();

// eslint-disable-next-line no-undef-init
let sessionStore = undefined;
const pgsession = require('connect-pg-simple')(session);

// eslint-disable-next-line new-cap
sessionStore = new pgsession({
  pool: require('./db/index').pool,
  // Connection Pool
  tableName: 'user_sessions',
});

const sess = session({
  store: sessionStore,
  secret: 'awrecnireooahuo121345678765432345678',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 30 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    secure: 'auto', // wenn https verwendet wird auf true setzen
  },
});

let corsOption = {};
const isDevelopment = true; // Restservice on LocalHost 3000 and Client on Localshost 8080

app.use(helmet());
if (isDevelopment) {
  corsOption = {
    origin: 'http://localhost:8081',
    credentials: true,
  };
  const cors = require('cors');
  app.use(cors(corsOption));
}
app.use(sess);

function userCheck(req, res, next) {
  if (!req.session.db_user_id) {
    res.status(401).json({ error: 'Error' });
    return;
  }
  next();
}

app.use(morgan('dev'));

app.use(express.static(path.join(__dirname, '/public')));

app.use(express.json());
app.use('/', persons);

app.use(errorHandler);
app.use(notFound);
const PORT = 3000;

app.listen(PORT);
