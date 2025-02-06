const express = require('express');

const authMiddleware = require('../middlewares/authMiddleware');
const { createResturantControoler, getAllResturantController, getResturantByIdController, deleteResturantController } = require('../controllers/resturantController');

const router = express.Router();

//routes
//Create RESTURANT || POST
router.post('/create',authMiddleware,createResturantControoler)

//GET ALL RESTURANT || GET
router.get('/getAll',getAllResturantController)

//GET SINGLE RESTURANT
router.get('/get/:id',getResturantByIdController)

//DELETE SINGLE RESTURANT
router.delete('/delete/:id',authMiddleware,deleteResturantController)

module.exports = router