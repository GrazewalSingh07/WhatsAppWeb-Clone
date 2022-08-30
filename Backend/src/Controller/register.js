
const express= require("express")
const User = require("../Model/User.model")
const router= express.Router()

router.post("/",async(req,res)=>{
    try {
        const user= await User.create(req.body)
        return res.status(201).send({"status":"registered",user})
    } catch (error) {

        return res.status(401).send({"Try again":error.message})
    }
})

module.exports= router