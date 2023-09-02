import { hashPassword } from "./../helpers/authHelper.js";
import usermodel from "../models/usermodel.js";

const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;

    // Validation
    if (!name) return res.status(400).send({ error: "Name is Required" });
    if (!email) return res.status(400).send({ error: "Email is Required" });
    if (!password) return res.status(400).send({ error: "Password is Required" });
    if (!phone) return res.status(400).send({ error: "Phone number is Required" });
    if (!address) return res.status(400).send({ error: "Address is Required" });

    // Check if user already exists
    const existingUser = await usermodel.findOne({ email });

    if (existingUser) {
      return res.status(409).send({
        success: false,
        message: "User already exists with this email ID",
      });
    }

    // Hash the password
    const hashedPassword = await hashPassword(password);

    // Create a new user
    const newUser = new usermodel({
      name,
      email,
      phone,
      address,
      password: hashedPassword,
    });

    // Save the user to the database
    await newUser.save();

    res.status(201).send({
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

export default { registerController };
