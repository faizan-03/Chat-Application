import jwt from 'jsonwebtoken';

export const generateToken = (userId,res)=>{

    const token = jwt.sign({userId}, process.env.JWT_SECRET,{
        expiresIn:"7d"
    });

    res.cookie("jwt",token,{
        httpOnly:true,  // cookie cannot be accessed by client side scripts
        maxAge:7*24*60*60*1000, // cookie will expire in 7 days
        sameSite:"strict",  // cookie will only be sent in requests to the same site
        secure:process.env.NODE_ENV !== "development" // cookie will only be sent in HTTPS requests
    });

    return token;

}