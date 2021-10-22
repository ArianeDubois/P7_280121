const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const auth = require('../middelwares/auth');
const isUser = require('../middelwares/isUser');
const isUserOrAdmin = require('../middelwares/isUserOrAdmin');
const multer = require('../middelwares/multer');

router.post('/signup', multer, userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/profil/:id', auth, userCtrl.userProfil);
router.put('/profil/:id', auth, isUser, multer, userCtrl.updateProfil);
router.delete('/profil/:id', auth, isUserOrAdmin, userCtrl.deleteProfil);
router.get('/:id/profil', auth, userCtrl.getAllUsers);

module.exports = router;
