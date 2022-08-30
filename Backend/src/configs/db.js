const mongoose= require("mongoose")
require("dotenv").config()

module.exports =()=>{
    mongoose.connect(process.env.MONGO_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    }).then(()=>{
        console.log("Connection Stabilised")
    }).catch((err)=>{
        console.log("Connection Lost",err.message)
    })
}