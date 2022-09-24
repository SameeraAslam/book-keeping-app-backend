const express = require("express");
const booksRoute = express.Router();
const Book = require("../models/Book");
const asyncHandler = require('express-async-handler');
const authMiddleware = require("../middlewares/authMiddleware");

//CREATE  A BOOK
booksRoute.post("/", asyncHandler(async(req,res)=>{
    const book = await Book.create(req.body);
    if(book){
        res.status(200);
        res.json(book);
    }
    else{
        res.status(500);
        throw new Error("Book creation is failed.")
    }

}))

//GET A BOOK

booksRoute.get("/", asyncHandler(async(req,res)=>{
    const book = await Book.find({});
    if(book){
        res.status(200);
        res.json(book);
    }
    else{
        res.status(500);
        throw new Error("There is no such book..")
    }

}))

//UPDATE A BOOK
booksRoute.put("/:id",asyncHandler(async(req,res)=>{
  const book = await Book.findById(req.params.id);
  console.log("req.", req.param.id,"----", req.body);
  if(book){
   const update = await Book.findOneAndUpdate({_id:req.params.id}, {...req.body},{
    runValidators:true,
        useFindAndModify:false,
    })
    
    res.status(200).json(update);
  
}
else{
    res.status(500);
    throw new Error("Update is failed.")
}
}))

//DELETE BOOK
booksRoute.delete("/:id",asyncHandler(async(req,res)=>{
    try{
        const book = await Book.findByIdAndDelete(req.params.id);
        res.status(200);
        res.send(book);
        
    }
    catch(error){
        res.json(error);

    }
}))

module.exports= booksRoute;