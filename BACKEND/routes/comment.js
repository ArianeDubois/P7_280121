const express = require('express');
const router = express.Router(); //enregistre dans router
const commentCtrl = require('../controllers/comment'); // pour implémenter les routes

router.post('/post/:id', commentCtrl.createComment);
router.get('/post/:id/comment', commentCtrl.getComments);
router.delete('/comment/:id', commentCtrl.deleteComment);

module.exports = router;
