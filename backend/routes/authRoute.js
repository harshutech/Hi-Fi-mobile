import express from "express";
import authController from '../controllers/authController.js';
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
const {registerController, loginController, testController} = authController;


// router object
const router = express.Router()


//routing 
//REGISTER || METHOD POST
router.post('/register',registerController)

//LOGIN || POST METHOD
router.post("/login" ,loginController)

//test Routes 
router.get('/test', requireSignIn,isAdmin, testController)


export default router;