
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDb= async ()=>{
    try{
        await mongoose.connect(process.env.MONGO)
        console.log("connect to mongodb..")
    }catch(error){
        console.log("error while connecting")
        throw error
    }
}

mongoose.connection.on("disconnected", () =>{
    console.log("disconnect db")
})

export default connectDb;
