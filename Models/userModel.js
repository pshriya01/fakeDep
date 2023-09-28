const mongoose=require('mongoose')
const userSchema=mongoose.Schema({
    username:{type:String,required:true},
    Avatar:{type:String,required:true},
    Email:{type:String,required:true},
    Password:{type:String,required:true},
})

const UserMOdel=mongoose.model('user',userSchema)

module.exports={
    UserMOdel
}