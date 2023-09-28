const express=require ('express')
const { userRouter } = require('./Router/userRouter')
const { blogRouter } = require('./Router/BlogRouter')
const {connection}=require('./db')
require('dotenv').config()
const app=express()
app.use(express.json())
app.use('/users',userRouter)
app.use('/blogs',blogRouter)




app.get('/',(req,res)=>{
    res.status(200).send({'msg':'Welcome to backend of Blogs app'})
})

app.listen(process.env.PORT,async()=>{
    
    try{
        await connection
        console.log('Connected to DB')
        console.log(`Server is listening to ${process.env.PORT}`)
    }catch(err){
        console.log(err)
    }
    
})