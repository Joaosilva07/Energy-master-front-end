
const express = require('express');
const { registerUser, loginUser } = require('../controlers/authControler');

const router = express.Router();

// Rota de registro
router.post('/signup', registerUser);
// Rota de login
router.post('/login', loginUser);

module.exports = router;
