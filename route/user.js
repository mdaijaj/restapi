import express from "express";
import {verifyToken} from '../utils/verifytoken.js'
const router=express.Router();  

router.get('/checkauthentication', verifyToken, (req,res)=>{
    console.log("aijaj")
    res.send("hello user your are authorized or you are logged In !")
})


export default router;