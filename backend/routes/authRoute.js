import express from "express";
import authController from '../controllers/authController.js';
const {registerController} = authController;


// router object
const router = express.Router()


//routing 
//REGISTER || METHOD POST
router.post('/register',registerController)


export default router;