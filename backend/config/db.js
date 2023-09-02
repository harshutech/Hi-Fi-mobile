import mongoose from "mongoose";

const connectDB = async()=>{

    try {
        const conn = await mongoose.connect(process.env.mongo_url)

        console.log(`connected to mongoDb ${conn.connection.host}`);

    } catch (error) {
        console.log(`Error in mongo Db ${error}`);
    }
}

export default connectDB;