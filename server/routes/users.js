var express = require('express');
var router = express.Router();

const {userSignup, userLogin, verifyToken, userImageUpdate}=require('../controllers/userController');
const {uploadSingleFile}  = require('../utils/multer');
const { adminLogin, getAllUsers, deleteUser, getUserDetails, updateUser, adminSearchUser } = require('../controllers/adminController');

router.post('/signup',userSignup);
router.post('/login',userLogin);
router.post('/verifyUserToken', verifyToken)
router.post('/updateImage/:id', uploadSingleFile, userImageUpdate)

// -------------------- Admin ---------------------
router.post('/adminLogin', adminLogin)
router.get('/getAllUsers', getAllUsers)
router.delete('/deleteUser/:id', deleteUser)
router.get('/adminEditUser/:id', getUserDetails)
router.put('/updateUser/:id', updateUser);
router.get('/searchUser/:userkey', adminSearchUser)


module.exports = router;
