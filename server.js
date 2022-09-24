const express = require("express");
const dotenv= require("dotenv");
const cors  = require("cors")
const usersRoute  = require("./routes/usersRoute");
const booksRoute = require("./routes/booksRoute")
const error = require("./middlewares/errorHandlerMiddleware")
dotenv.config();
require("./config/dbConnection")();

const app = express();

//PARSING INCOMING REQUESTS
app.use(cors())
app.use(express.json());


//DATABASE CONNECTION BUILT ABOVE


//USER ROUTES
app.use("/api/users", usersRoute);

//BOOK ROUTES
app.use("/api/books", booksRoute);


//Error Handler Middlewares
app.use(error.errorHandlerMiddleware);


//PORT SETTINGS
const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
    console.log(`server is running on ${PORT}`);
})