import jwt from 'jsonwebtoken'
import createError from './error.js'

//verify token
export const verifyToken= async (req,res,next)=>{
    let token=req.headers.cookie
    if(!token){
        return next(createError(401, "You are not authenticated"))
    }
    let cookies=token.split("=")[1]
    console.log("cookies", cookies)
    jwt.verify(cookies, process.env.JWT, (err, user)=>{
        if(err) return next(createError(403), "token is not valid")
        req.user=user
        next()
    })
}
