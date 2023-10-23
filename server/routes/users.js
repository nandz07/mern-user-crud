var express = require('express');
var router = express.Router();

const {userSignup, userLogin, verifyToken, userImageUpdate}=require('../controllers/userController');
const {uploadSingleFile}  = require('../utils/multer');

router.post('/signup',userSignup);
router.post('/login',userLogin);
router.post('/verifyUserToken', verifyToken)
router.post('/updateImage/:id', uploadSingleFile, userImageUpdate)


module.exports = router;
