const app= require("./index")

const connect=require("./configs/db")
require("dotenv").config()
const PORT=process.env.PORT
const server=app.listen(PORT,()=>{
    
    connect()
    console.log("http://localhost:4000")
    
})
module.exports= server