const express = require('express');
const router = express.Router();

const userController = require('../controller/user.controller');

router.get('/search', userController.getAllUsers);

router.get('/search/:id', userController.getUserById);

router.post(
    '/add',
    userController.addUser
);

router.patch(
    '/update/:id',
    userController.updateUser
);

router.delete(
    '/delete/:id',
    userController.deleteUser
);

module.exports = router;