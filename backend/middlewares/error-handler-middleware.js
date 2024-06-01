const errorMiddleware = (err,req,res,next)=>{
    console.log(err);

    if(!res){
        return next(err)
    }
    return res.status(500).json({msg:"Something went wrong"})
};

module.exports = errorMiddleware;