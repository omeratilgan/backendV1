const express = require('express');
const jwtAuth = require('../../../middleware/jwtAuth'); // JWT doğrulama middleware'i
const userController = require('../controllers/userController'); // Controller'ı dahil et

const router = express.Router();

// Kullanıcı işlemleri rotaları
router.post('/', userController.createUser); // Kullanıcı ekle
router.get('/', jwtAuth, userController.getUsers); // Kullanıcı listele
router.put('/:id', jwtAuth, userController.updateUser); // Kullanıcı güncelle
router.delete('/:id', jwtAuth, userController.deleteUser); // Kullanıcı sil

module.exports = router;
