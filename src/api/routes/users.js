const express = require('express');
const router = express.Router();
const jwtAuth = require('../middleware/jwtAuth');
const userController = require('../controllers/userController');
const validateRequest = require('../middleware/validateRequest');
const { userSchema } = require('../schemas/userSchema');

router.post('/', validateRequest(userSchema), userController.createUser);
router.get('/', jwtAuth, userController.getUsers);
router.put('/:id', jwtAuth, validateRequest(userSchema), userController.updateUser);
router.delete('/:id', jwtAuth, userController.deleteUser);

module.exports = router;