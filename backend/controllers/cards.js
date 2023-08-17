const Card = require('../models/card');
const { STATUS_CODES } = require('../utils/STATUS_CODES');
const { NotFoundError, ForbiddenError } = require('../utils/errors/errors');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => {
      res.send({ data: cards });
    })
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  Card.findOne(({ _id: req.params.cardId }))
    .orFail(() => {
      throw new NotFoundError('Карточка с таким id не найдена');
    })
    .then((card) => {
      if (card.owner._id.valueOf() === req.user._id) {
        // не получилось сделать через return, поэтому добавил блок catch,
        // чтобы ошибка БД при удалении карточки уходила глобальному обработчику
        card.deleteOne()
          .then(() => res.send({ message: 'Карточка успешно удалена' }))
          .catch(next);
      } else {
        throw new ForbiddenError('Отказано в доступе: удалять можно только свои карточки');
      }
    })
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res.status(STATUS_CODES.CREATED).send({ data: card }))
    .catch(next);
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true, runValidators: true },
  )
    .orFail(() => {
      throw new NotFoundError('Карточка с таким id не найдена');
    })
    .then((card) => res.send({ data: card }))
    .catch(next);
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      throw new NotFoundError('Карточка с таким id не найдена');
    })
    .then((card) => res.send({ data: card }))
    .catch(next);
};
