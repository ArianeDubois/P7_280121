const express = require('express');
const router = express.Router(); //enregistre dans router
const userCtrl = require('../controllers/user');
const auth = require('../middelwares/auth');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router;
