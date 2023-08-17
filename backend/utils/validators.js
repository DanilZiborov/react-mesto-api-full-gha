const { Joi } = require('celebrate');

const userSignInRules = {
  email: Joi.string().required().email(),
  password: Joi.string().required().min(8),
};

const userSignUpRules = {
  email: Joi.string().required().email(),
  password: Joi.string().required().min(8),
  name: Joi.string().min(2).max(30).default('Жак-Ив Кусто')
    .required(),
  about: Joi.string().min(2).max(30).default('Исследователь')
    .required(),
  avatar: Joi.string().regex(/^(https?:\/\/)?([\w-]{1,32}\.[\w-]{1,32})[^\s@]*$/im).default('https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png').required(),
};

const userDataRules = {
  name: Joi.string().min(2).max(30).default('Жак-Ив Кусто')
    .required(),
  about: Joi.string().min(2).max(30).default('Исследователь')
    .required(),
};

const userAvatarRules = {
  avatar: Joi.string().regex(/^(https?:\/\/)?([\w-]{1,32}\.[\w-]{1,32})[^\s@]*$/im).default('https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png').required(),
};

const cardRules = {
  name: Joi.string().min(2).max(30).required(),
  link: Joi.string().regex(/^(https?:\/\/)?([\w-]{1,32}\.[\w-]{1,32})[^\s@]*$/im).required(),
};

const objectIdRule = Joi.string().hex().length(24).required();

module.exports.userSignInValidator = {
  body: Joi.object().keys({ userSignInRules }).unknown(true),
};

module.exports.userSignUpValidator = {
  body: Joi.object().keys({ userSignUpRules }).unknown(true),
};

module.exports.userDataValidator = {
  body: Joi.object().keys(userDataRules).unknown(true),
};

module.exports.userAvatarValidator = {
  body: Joi.object().keys(userAvatarRules).unknown(true),
};

module.exports.cardValidator = {
  body: Joi.object().keys(cardRules).unknown(true),
};

module.exports.userIdParamsValidator = {
  params: Joi.object().keys({
    userId: objectIdRule,
  }),
};

module.exports.cardIdParamsValidator = {
  params: Joi.object().keys({
    cardId: objectIdRule,
  }),
};
