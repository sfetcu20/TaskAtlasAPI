const { Router } = require('express');
const { recaptcha } = require('../middleware');
const { User } = require('../controllers');
const { authenticate } = require('express-goodies/middleware');

const router = Router();
module.exports = router;

router.post('/user/register', recaptcha, User.register);
router.get('/user/posts/:id', authenticate, User.readOnePost);
router.post('/user/posts/apply/:id', authenticate, User.apply);
router.post('/user/posts/complete/:id', authenticate, User.completeJob);
router.get('/user/my-posts', authenticate, User.readMyPosts);
router.post('/reviews', authenticate, User.createReview);
