import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";

//protected Routes token base
export const requireSignIn = async(req,res,next)=>{

    try {
        //used for user cannot access the page without authorization token 
        const decode = JWT.verify(req.headers.authorization,process.env.JWT_SECRET);
        req.user = decode;
        next();

    } catch (error) {
        console.log(error); 
    }


};

//middleware for check user is admin or not
export const isAdmin = async(req,res,next) =>{

    try {
        const user = await userModel.findById(req.user._id)
        if(user.role !== 1){
            return res.status(401).send({
                success:false,
                message:"UnAuthorized acccess"
            })
        }
        else{
            next() //if user id admin then it continue to access the page
        }

    } catch (error) {
        console.log(error);
        res.status(501).send({
            success:false,
            error,
            message:"Error in admin middleware"
        })
    }
}