const express = require('express');
const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const knex = require('knex');

// Controllers
const register = require('./controllers/register');
const signin = require('./controllers/signin');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(bodyParser.json());

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
app.get('/', (req, res) => {
	res.send('Root!');
})

app.post('/signin', (req, res) => {
	signin.handleSignin(req, res, db, bcrypt);
});

app.post('/register', (req, res) => {
	register.handleRegister(req, res, db, bcrypt);
});

// Port connection
app.listen(PORT, () => {
	console.log(`App is listening on port ${PORT}`);
})