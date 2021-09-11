const express = require('express');
const router = express.Router(); //enregistre dans router
const userCtrl = require('../controllers/user');
const auth = require('../middelwares/auth');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/profil/:id', auth, userCtrl.userProfil);
router.put('/profil/:id', auth, userCtrl.updateProfil);
router.delete('/profil/:id', auth, userCtrl.deleteProfil);
router.get('/profil', auth, userCtrl.getAllUsers);

module.exports = router;
