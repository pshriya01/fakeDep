const express=require('express')
const { blogModel } = require('../Models/blogModel')
const { auth } = require('../Middleware/authMiddleware')
const { dateMiddleware } = require('../Middleware/dateMiddleware')



const blogRouter=express.Router()

blogRouter.use(auth)

blogRouter.get('/',async(req,res)=>{
   
    const {title,category,sort,order}=req.query
    let filter={}
    let sorted={}
    if(title){
      filter.title=title
    }
    if(category){
      filter.category=category
    }
    if(sorted && order){
      if(order==='asc'){
         order.date=1
      }
      if(order==='desc'){
         order.date=1
      }
    }
   
  try{
      const blogs=await blogModel.find(filter).sort(sorted)
      res.status(200).send(blogs)
  }
  catch(err){
    res.status(400).send({'msg':err.message})
  } 
})

blogRouter.post('/',dateMiddleware,async(req,res)=>{

    try{
       const Blog=new blogModel(req.body)
       await Blog.save()
       res.status(200).send({'msg':"Blog Posted Successfully ! "})

    }
    catch(err){
        res.status(400).send({'msg':err.message})
    } 
})

blogRouter.patch('/:id',async(req,res)=>{
    const {id}=req.params
    try{
       const Blog=await blogModel.findById(id)
       if(Blog){
         if(Blog.username!==req.body.username){
            res.send({'msg':'you are not authorized'})
         }else{
            await blogModel.findByIdAndUpdate(id,req.body)
            res.status(200).send({'msg':"Blog Updated Successfully !"})
         }
       }
    }
    catch(err){
        res.status(400).send({'msg':err.message})
    } 
})

blogRouter.delete('/:id',async(req,res)=>{
    const {id}=req.params
    try{
       const Blog=await blogModel.findById(id)
       if(Blog){
         if(Blog.username!==req.body.username){
            res.send({'msg':'you are not authorized'})
         }else{
            await blogModel.findByIdAndDelete(id)
            res.status(200).send({'msg':"Blog Deleted Successfully !"})
         }
       }
    }
    catch(err){
        res.status(400).send({'msg':err.message})
    } 
})

blogRouter.patch('/:id/like',async(req,res)=>{
  const {id}=req.params
  try{
     const Blog=await blogModel.findById(id)
     if(Blog){
       if(Blog.username!==req.body.username){
          res.send({'msg':'you are not authorized'})
       }else{
          await blogModel.findByIdAndUpdate(id,req.body)
          res.status(200).send({'msg':"Blog Updated Successfully !"})
       }
     }
  }
  catch(err){
      res.status(400).send({'msg':err.message})
  } 
})

blogRouter.patch('/:id/like',async(req,res)=>{
  const {id}=req.params
  try{
     const Blog=await blogRouter.findById(id)
     if(Blog){
       if(Blog.username!==req.body.username){
          res.send({'msg':'you are not authorized'})
       }else{
          await blogModel.findByIdAndUpdate(id,req.body)
          res.status(200).send({'msg':"Blog Updated Successfully !"})
       }
     }
  }
  catch(err){
      res.status(400).send({'msg':err.message})
  } 
})




module.exports={
    blogRouter
}