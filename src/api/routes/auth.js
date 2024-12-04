const express = require('express');
const authController = require('../controllers/authController'); // Controller'ı dahil et

const router = express.Router();

// Giriş işlemi rotası
router.post('/login', authController.login);

module.exports = router;
