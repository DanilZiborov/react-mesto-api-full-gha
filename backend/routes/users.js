const router = require('express').Router();
const { celebrate } = require('celebrate');
const auth = require('../middlewares/auth');
const {
  getUsers, getUserById, updateUserInfo, updateUserAvatar, getUserInfo,
} = require('../controllers/users');
const { userIdParamsValidator, userDataValidator, userAvatarValidator } = require('../utils/validators');

router.get('/', auth, getUsers);
router.get('/me', auth, getUserInfo);
router.get('/:userId', auth, celebrate(userIdParamsValidator), getUserById);
router.patch('/me', auth, celebrate(userDataValidator), updateUserInfo);
router.patch('/me/avatar', auth, celebrate(userAvatarValidator), updateUserAvatar);

module.exports = router;
