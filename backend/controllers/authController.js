import { comparePassword, hashPassword } from "./../helpers/authHelper.js";
import usermodel from "../models/usermodel.js";
import JWT from 'jsonwebtoken';

 const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;

    // Validation all the inputs
    if (!name) return res.status(400).send({ error: "Name is Required" });
    if (!email) return res.status(400).send({ error: "Email is Required" });
    if (!password) return res.status(400).send({ error: "Password is Required" });
    if (!phone) return res.status(400).send({ error: "Phone number is Required" });
    if (!address) return res.status(400).send({ error: "Address is Required" });

    // Check if user already exists
    const existingUser = await usermodel.findOne({ email });

    if (existingUser) { //if already exists throw error bcz this is user register method
      return res.status(409).send({
        success: false,
        message: "User already exists with this email ID",
      });
    }

    // Hash the password
    const hashedPassword = await hashPassword(password);

    // Create a new user in database
    const newUser = new usermodel({
      name,
      email,
      phone,
      address,
      password: hashedPassword,
    });

    // Save the user to the database
    await newUser.save();

    res.status(201).send({ //give the response when successfully registerd 
      success: true,
      message: "User registered successfully",
      user: newUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error in Registration",
      error,
    });
  }
};



//POST LOGIN authentication
 const loginController = async (req,res)=>{

    try {
      const {email,password} = req.body // taking email and password by request body 

      //validate
      if(!email || !password){ // if email and password is not enterd 
        return res.status(404).send({
          success:false,
          message:"Invalid email and password"
        })
      }

      //check user in database is avilable in database 
      const user = await usermodel.findOne({email})

      if(!user){ //if not found return login error 
        return res.status(404).send({
          success:false,
          message:"Error in login",
          error
        })
      }

      //comparing password to hashed password 
      const match = await comparePassword(password,user.password)

      if(!match){ //if not matched throw error 
        return res.status(404).send({
          success:false,
          message:"invalid password",
          error
        })
      }

      //generate token if avilable
      const token = await JWT.sign({_id:user._id},process.env.JWT_SECRET,{expiresIn:"7d",});
      res.status(200).send({
        success:true,
        message:"login Successfully",
        user:{
          name:user.name,
          email:user.email,
          phone:user.phone,
          address:user.address,
        },
        token
      })


    } catch (error) {
      console.log(error);
      res.status(500).send({
        success:false,
        message:"Error in login",
        error
      })
    }
 }







export default { registerController, loginController};
