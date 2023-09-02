import express from "express";
import authController from '../controllers/authController.js';
const {registerController, loginController} = authController;


// router object
const router = express.Router()


//routing 
//REGISTER || METHOD POST
router.post('/register',registerController)

//LOGIN || POST METHOD
router.post("/login" ,loginController)


export default router;