const jwt=require('jsonwebtoken')
require('dotenv').config()
const auth=(req,res,next)=>{
    try{
        const token=req.headers.authorization
        if(token){
           var decoded = jwt.verify(token, process.env.Key);
             console.log(decoded)
             req.body.username=decoded.username
             req.body.userId=decoded.userId
             next()
        }else{
           res.status(200).send({'msg':"You are not Authorized !"})
        }
    }
    catch(err){
        res.status(400).send({'msg':err.message})
    }
     

}


module.exports={
    auth
}