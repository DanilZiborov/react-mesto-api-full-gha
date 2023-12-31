require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { celebrate, errors } = require('celebrate');
const cors = require('cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { login } = require('./controllers/users');
const { createUser } = require('./controllers/users');

const { NotFoundError } = require('./utils/errors/errors');

const { userSignInValidator, userSignUpValidator } = require('./utils/validators');

const { DB_ADRESS = 'mongodb://127.0.0.1/mestodb' } = process.env;
const { PORT = 3000 } = process.env;
mongoose.connect(DB_ADRESS);

const app = express();
app.use(cors());

app.use(express.json());

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.post('/signin', celebrate(userSignInValidator), login);
app.post('/signup', celebrate(userSignUpValidator), createUser);

app.use((req, res, next) => {
  const err = new NotFoundError('Ресурс не найден');
  next(err);
});

app.use(errorLogger);

app.use(errors());

// тут линтер ругается, но, как я понял, четыре аргумента обязательны для обработчика ошибки
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
