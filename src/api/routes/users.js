const express = require('express');
const router = express.Router();
const jwtAuth = require('../../api/middleware/jwtAuth'); // JWT doğrulama middleware'i
const userController = require('../controllers/userController'); // Controller'ı dahil et
const checkRole = require('../middleware/checkRole');


// Kullanıcı işlemleri rotaları
router.post('/', userController.createUser); // Kullanıcı ekle
router.get('/', jwtAuth, userController.getUsers); // Kullanıcı listele
//router.get('/', jwtAuth, checkRole(['admin']), userController.getUsers); // Admin list
//router.get('/role', jwtAuth, checkRole(['user']), userController.getUsersByRole); // User list
router.put('/:id', jwtAuth, userController.updateUser); // Kullanıcı güncelle
router.delete('/:id', jwtAuth, userController.deleteUser); // Kullanıcı sil

module.exports = router;
