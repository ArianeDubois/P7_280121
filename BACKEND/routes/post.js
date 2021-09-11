const express = require('express');
const router = express.Router(); //enregistre dans router
const postCtrl = require('../controllers/post');
const multer = require('../middelwares/multer');
const auth = require('../middelwares/auth');

router.post('/post', auth, multer, postCtrl.createPost);
router.get('/post', auth, postCtrl.getAllPosts);
router.delete('/post/:id', auth, postCtrl.deletePost);

module.exports = router;
