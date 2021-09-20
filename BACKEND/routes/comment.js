const express = require('express');
const auth = require('../middelwares/auth');
const isCommentAuthorOrAdmin = require('../middelwares/isCommentAuthorOrAdmin');
const router = express.Router(); //enregistre dans router
const commentCtrl = require('../controllers/comment'); // pour implémenter les routes

router.post('/post/:id', auth, commentCtrl.createComment);
router.get('/post/:id/comment', auth, commentCtrl.getComments);
router.delete('/comment/:id', auth, isCommentAuthorOrAdmin, commentCtrl.deleteComment);

module.exports = router;
