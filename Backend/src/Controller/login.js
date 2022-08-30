
const express= require("express")
const User = require("../Model/User.model")
const router= express.Router()
require("dotenv").config()
const jwt = require('jsonwebtoken');
 
const newToken=(user)=>{
    return jwt.sign({user},process.env.SECRET_KEY)
}

router.post("/",async(req,res)=>{
    try {
        const user=await  User.findOne({email:req.body.email})
         
        if(!user){
            return res.status(401).send("Register please")
        }
        
        const match=user.checkPassword(req.body.password)
       
       if(!match){
           return  res.status(400).send("Email or password incorrect")
       }
       const token=newToken(user)
       return res.status(200).send({user,token})
    } catch (error) {
        return res.status(401).send({"Wrong credentials":error.message})
    }
})

module.exports= router