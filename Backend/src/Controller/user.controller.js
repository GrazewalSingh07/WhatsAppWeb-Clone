
const express= require("express")
const User = require("../Model/User.model")
const router= express.Router()

router.get("/",async(req,res)=>{
    try {
        const user= await User.find().lean().exec()
        return res.status(201).send({user})
    } catch (error) {

        return res.status(401).send({"Try again":error.message})
    }
})

module.exports= router