const express = require('express');
const router = express.Router(); //enregistre dans router
const userCtrl = require('../controllers/user');
const auth = require('../middelwares/auth');
const isUser = require('../middelwares/isUser');
const isUserOrAdmin = require('../middelwares/isUserOrAdmin');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/profil/:id', auth, userCtrl.userProfil);
router.put('/profil/:id', auth, isUser, userCtrl.updateProfil);
// router.delete('/profil/:id', auth, isUser userCtrl.deleteProfil);
router.delete('/profil/:id', auth, isUserOrAdmin, userCtrl.deleteProfil);
router.get('/:id/profil', auth, userCtrl.getAllUsers);

module.exports = router;
