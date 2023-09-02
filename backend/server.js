import express from "express";
import dotenv from 'dotenv';
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from './routes/authRoute.js';

// Configure ENV
dotenv.config();

// Database config
connectDB();

// PORT
const PORT = process.env.PORT || 8080;

// Create the Express app
const app = express();

// Middleware
app.use(express.json()); // <-- Move this middleware above route definitions
app.use(morgan('dev'));

// Routes
app.use('/api/v1/auth', authRoutes);

// REST API
app.get('/', (req, res) => {
    res.send({
        message: "Welcome to hi-fi mobile"
    });
});

// Code for app listening
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});

//updated by chatgpt