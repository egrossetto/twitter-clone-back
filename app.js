const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

const authValidator = require('./routes/middlewares/authValidator');
const tweetsRouter = require('./routes/tweets');
const loginRouter = require('./routes/login');
const usersRouter = require('./routes/users');

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/TwitterClone', {useNewUrlParser: true})

app.use(bodyParser.json());
app.use(cors());

app.use('/api/v1/tweets', authValidator, tweetsRouter);
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/login', loginRouter);

module.exports = app;