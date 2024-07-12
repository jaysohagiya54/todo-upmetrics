const express = require('express');
const {authenticate} = require("../middlewares/auth")
const router = express.Router();
const multer = require('multer');
const UserController = require('../controllers/UserController');


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/'); // Specify the upload directory
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    }
  });
  
  const upload = multer({ storage: storage });


router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.post('/forgot-password', UserController.forgotPassword);
router.put('/update',authenticate,upload.single('profilePicture') ,UserController.updateProfilePicture);

router.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send({ message: 'Internal Server Error' }); // Or customize
})

module.exports = router;