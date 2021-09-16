const express = require('express');
const auth = require('../middelwares/auth');
const isCommentAuthor = require('../middelwares/isCommentAuthor');

const router = express.Router(); //enregistre dans router
const commentCtrl = require('../controllers/comment'); // pour implémenter les routes

router.post('/post/:id', auth, commentCtrl.createComment);
router.get('/post/:id/comment', auth, commentCtrl.getComments);
router.delete('/comment/:id', auth, isCommentAuthor, commentCtrl.deleteComment);

module.exports = router;
