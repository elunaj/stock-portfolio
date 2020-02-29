require('dotenv').config({ path: './.env'});

const express = require('express');
const path = require('path');
const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const searchRouter = require('./routes/search');
const pg = require('pg');
const PG_DECIMAL_OID = 1700;
pg.types.setTypeParser(PG_DECIMAL_OID, parseFloat);
const knex = require('knex');

// Controllers
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const transactions = require('./controllers/transactions');
const portfolio = require('./controllers/portfolio');
const app = express();
const PORT = process.env.PORT || 5000;


// Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(bodyParser.json());

// routes
app.use('/search', searchRouter);

// Database connection
const db = knex({
  client: 'pg',
  connection: {
    host : 'localhost',
    user : 'Luna23',
    password : '',
    database : 'stock-portfolio'
  }
});

// API endpoints
// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.post('/signin', (req, res) => {
	signin.handleSignin(req, res, db, bcrypt);
});

app.post('/register', (req, res) => {
	register.handleRegister(req, res, db, bcrypt);
});

app.get('/profile/:id', (req, res) => {
  profile.handleProfileGet(req, res, db);
});

app.post('/transactions', (req, res) => {
  transactions.handleTransactionAdd(req, res, db);
});

app.get('/transactions/:id', (req, res) => {
  transactions.handleTransactionsGet(req, res, db);
});

app.get('/portfolio/:id', (req, res) => {
  portfolio.handlePortfolioGet(req, res, db);
});

// Serve static files from the React app
app.use(express.static(__dirname + '/client/build'));

// Port connection
app.listen(PORT, () => {
	console.log(`App is listening on port ${PORT}`);
})