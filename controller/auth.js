import User from '../model/user.js'
import bcrypt from 'bcryptjs'
import createError from '../utils/error.js'
import jwt from 'jsonwebtoken'



//register user
export const register= async(req,res,next)=>{
    let {username,email,password,phone}=req.body
    try{
        const salt= bcrypt.genSaltSync(10);
        password= bcrypt.hashSync(req.body.password, salt)

        const userExits= await User.findOne({email: email})
        if(userExits){
            res.status(500).send("user allready exits...")
            return "email allready exits please login..."
        }
        const newUser= new User({ 
            username,
            email,
            password,
            phone
        }) 
        await newUser.save();
        return res.status(200).send({data: newUser,message:"User has been created"})
    }catch(err){
        console.log(err.message)
        throw err
    }
}

//login user
export const login= async(req,res,next)=>{
    try{
        const {email, password}=req.body;
        const user= await User.findOne({email: email})
        if(!user) return next(createError(404, "User not found"))

        const isPasswordCorrect= await bcrypt.compare(password, user.password)

        if(!isPasswordCorrect) return next(createError(400, "password is not correct"))
        const {...otherDetails}= user._doc

        const token= jwt.sign({id: user.id}, process.env.JWT)
        return res.cookie("access_token", token, {
            httpOnly: true
        }).status(200).send({...otherDetails, token: token})
    }catch(err){
        console.log(err.message)
        next(err)
    }
}


//logout user
export const loggedOut=(req,res)=>{
    res.cookie("access_token", null, {
        expires: new Date(Date.now()),
        httpOnly: true
    });
    res.status(200).send({success: true, message: "logged out Success"})
}
