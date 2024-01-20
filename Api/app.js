require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken'); 


mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to the database'));

app.use(express.json());
const registerRouter = require('./routes/users');
app.use('/register', registerRouter);

const usersRouter = require('./routes/users');
app.use('/users', usersRouter);

const loginRouter = require('./routes/users');
app.use('/login', loginRouter);

app.listen(3001, () => console.log('Server started'));

