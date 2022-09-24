const errorHandlerMiddleware = (err,req,res,next) =>{
    const errStatusCode = res.statusCode === 200? 500: res.statusCode;
    res.status(errStatusCode);
    res.json({
        message: err.message,
    })
}
module.exports = {errorHandlerMiddleware}