import express from "express";
import dotenv from "dotenv";
import authRoute from './route/auth.js'
import user from './route/user.js'
import connectDb from "./database/index.js";

const app= express();
dotenv.config();

//middleware
app.use(express.json())
app.use("/api/auth", authRoute)
app.use("/api/user", user)


const port= process.env.PORT 
app.listen(port, ()=>{
    connectDb()
    console.log(`port is listening this port${port}`)
})


