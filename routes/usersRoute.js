const express = require("express");
const usersRoute = express.Router();
const User = require("../models/User");
const JsonToken = require('../utils/JsonToken');
const asyncHandler = require('express-async-handler');
const authMiddleware = require("../middlewares/authMiddleware");


//REGISTER ROUTE
usersRoute.post("/register", asyncHandler(async (req,res)=>{
    const {name, email, password} = req.body;

    const userExists = await User.findOne({email:email});
    if(userExists){
        throw new Error('user exists already.. with same email as yours..')
    }
    const CreateNewUser = await User.create({name, email, password});
     res.json({
        _id: CreateNewUser._id,
        name: CreateNewUser.name,
        password: CreateNewUser.password,
        email:CreateNewUser.email,
        token:JsonToken(CreateNewUser._id),
      });


}))


//LOGIN ROUTE
usersRoute.post("/login", asyncHandler(async (req,res)=>{
    const {email, password} = req.body;
    const user = await User.findOne({email});

    if(user && (await user.isPasswordVerified(password))){
       res.status(200);
       res.json({
        _id: user._id,
        name: user.name,
        password: user.password,
        email: user.email,
        token: JsonToken(user._id),
      });
    }
    else{
        res.status(401);
        throw new Error("Invalid Credentials.")
    }
}))



usersRoute.put("/update",authMiddleware,(req,res)=>{
    res.send("hello from update!")
})

usersRoute.delete("/:id",(req,res)=>{
    res.send("hello from delete!")
})

usersRoute.get("/",authMiddleware,(req,res)=>{
    res.send(req.user);
})

// usersRoute.get("/profile", authMiddleware,asyncHandler(async(req,res)=>{
//     res.send(req.user);
    

//         // const users = await User.find({});

//         // if (users) {
//         //   res.status(200).json(users);
//         // } else {
//         //   res.status(500);
    
//         //   throw new Error('No users found at the moment');
//         // }
  

// }))

module.exports = usersRoute;

