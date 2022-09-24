const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authMiddleware = asyncHandler(async (req,res,next)=>{
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer ')){
        try{
            token = req.headers.authorization.split(' ')[1];
            const decode= jwt.verify(token,process.env.MY_SECRET_KEY);
            const user = await User.findById(decode.id);
            req.user = user;

            next();


        }
        catch(err){
            res.status(401);
            throw new Error("Not Authorized.")

        }
    }

})

module.exports = authMiddleware;