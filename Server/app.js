const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const path = require('path');
const persons = require('./routes/portfolio_management');
const { errorHandler, notFound } = require('./middleware/errorHandler');

require('colors');
require('dotenv').config();

const app = express();

app.use(morgan('dev'));
app.use(helmet());

app.use(express.static(path.join(__dirname, '/public')));

app.use(express.json());
app.use('/', persons);

app.use(errorHandler);
app.use(notFound);
const PORT = 3000;

app.listen(PORT);
