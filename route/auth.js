import express from "express";
import { login, register, loggedOut } from "../controller/auth.js";

const router= express.Router();

router.get('/', (req, res)=>{   
    res.send("hello how are you bro")
})

router.post('/register', register)
router.post('/login', login)
router.get('/logout', loggedOut)


export default router;