const express=require('express')
const { UserMOdel } = require('../Models/UserMOdel')
const bcrypt=require('bcrypt')
var jwt = require('jsonwebtoken');
require('dotenv').config()
const userRouter=express.Router()


userRouter.post('/register',async(req,res)=>{
    console.log('abc')
    console.log(req.body)
    let {username,Avatar,Email,Password}=req.body
    try{
        let Existinguser=await UserMOdel.findOne({Email})
        if(Existinguser){
            res.status(200).send({"msg":"User Already Exists!"})
        }else{
            bcrypt.hash(Password, 5, async function(err, hash) {
                if(err){
                    res.status(400).send({"msg":err})
                }else{
                   const User=new UserMOdel({username,Avatar,Email,Password:hash})
                   await User.save()
                   res.status(200).send({"msg":"New User is Registered Successfully!"})   }
            });
        }
    }
    catch(err){
        res.status(400).send({"msg":err})
    }
})


userRouter.post('/login',async(req,res)=>{
    let {Email,Password}=req.body
    try{
         const User=await UserMOdel.findOne({Email})
         bcrypt.compare(Password, User.Password, function(err, result) {
            if(result){
                var token = jwt.sign({ username: User.username,userId:User._id }, process.env.Key);
                res.status(200).send({'msg':'Login Successful!',token})
            }else{
                res.status(200).send({'msg':'Login Failed !'})
            }
            
        });
    }
    catch(err){
        res.status(400).send({"msg":err})
    }
})

module.exports={
    userRouter
}