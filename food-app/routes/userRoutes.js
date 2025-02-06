const express = require('express');
const { getUserController, UpdateUserController, updatePasswordController, resetPasswordController, deleteProfileController } = require('../controllers/userControllers');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

//routes
//GET USER || GET
router.get('/getUser',authMiddleware,getUserController)

//UPDATE PROFILE
router.post('/updateUser',authMiddleware,UpdateUserController);

//password Update
router.post('/updatePassword',authMiddleware,updatePasswordController)

//RESET PASSWORD    
router.post('/resetPassword',authMiddleware,resetPasswordController)

//DELETE USER
router.delete('/deleteUser/:id',authMiddleware,deleteProfileController)

module.exports = router