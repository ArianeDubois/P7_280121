const express = require('express');
const router = express.Router(); //enregistre dans router
const postCtrl = require('../controllers/post');
const multer = require('../middelwares/multer');
const auth = require('../middelwares/auth');

router.post('/post', auth, multer, postCtrl.createPost);
router.post('/post', multer, postCtrl.createPost);
router.get('/post', postCtrl.getAllPosts);
router.put('/post/:id', postCtrl.likePost);

module.exports = router;
