const mongoose = require("mongoose");

const dbConnection = () =>{
    mongoose.connect(process.env.MONGO_URL,{
    useFindAndModify:true,
    useUnifiedTopology:true,
    useCreateIndex:true,
    useNewUrlParser:true,
    
}).then(()=>{
    console.log("database connected..")

}).catch((err)=>{
    console.log(err)
})
}

module.exports = dbConnection;

//use mongoose@5