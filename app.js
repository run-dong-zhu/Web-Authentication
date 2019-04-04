const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const app = express();

const usersRouter = require('./routes/users');

// Middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());

// Routes
app.use('/users', usersRouter);

// Start the server
const port = process.env.PORT || 3000;
app.listen(port);
console.log(`Server listening at ${port}`);