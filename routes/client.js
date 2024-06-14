const { Router } = require('express');

const { Client } = require('../controllers');
const { authenticate, authorize } = require('express-goodies/middleware');

const router = Router();
module.exports = router;

router.post('/client/posts', authenticate, authorize('client'), Client.createPost);
router.get('/client/posts', authenticate, Client.readManyPosts);
router.get('/client/all-posts', authenticate, Client.readManyAll);
