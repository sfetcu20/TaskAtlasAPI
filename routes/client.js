const { Router } = require('express');

const { Client } = require('../controllers');
const { authenticate, authorize } = require('express-goodies/middleware');

const router = Router();
module.exports = router;

router.post('/client/posts', authenticate, authorize('client'), Client.createPost);
router.get('/client/posts', authenticate, Client.readManyPosts);
router.get('/client/posts/:id', authenticate, Client.readOnePost);
router.delete('/client/posts/:id', authenticate, Client.removePost);
router.post('/client/posts/choose/:id', authenticate, Client.chooseFreelancer);
router.get('/client/all-posts', authenticate, Client.readManyAll);
router.put('/client/posts/:id', authenticate, Client.updatePost);
router.get('/client/my-posts', authenticate, Client.readMyPosts);
