const mongoose=require('mongoose')
const blogSchema=mongoose.Schema({
      username:{type:String,required:true},
      title:{type:String,required:true},
      content:{type:String,required:true},
      category:{type:String,required:true},
      date:{type:String,required:true},
      likes:{type:Number,required:true,default: 0},
      userId:{type:String,required:true},
      comments:[{username :String, content : String}],
      
})

const blogModel=mongoose.model('blog',blogSchema)

module.exports={
    blogModel 
}