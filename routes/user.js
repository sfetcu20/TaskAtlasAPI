const { Router } = require('express');
const { recaptcha } = require('../middleware');
const { User } = require('../controllers');

const router = Router();
module.exports = router;

router.post('/user/register', recaptcha, User.register);
