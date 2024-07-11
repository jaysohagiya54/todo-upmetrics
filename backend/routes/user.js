const express = require('express');
const {authenticate} = require("./middlewares/auth")
const router = express.Router();
const UserController = require('../controllers/userController');

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.post('/forgot-password',authenticate, UserController.forgotPassword);
router.post('/update-profile-picture',authenticate, UserController.updateProfilePicture);

router.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send({ message: 'Internal Server Error' }); // Or customize
})

module.exports = router;