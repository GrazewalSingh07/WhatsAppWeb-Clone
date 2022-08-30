const mongoose= require("mongoose")
const bcrypt= require("bcrypt")

const userScheme= new mongoose.Schema({
    username:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true}
})

userScheme.pre("save",function(next){
    const hash= bcrypt.hashSync(this.password,8)
    this.password= hash
    return next()
})
userScheme.methods.checkPassword=function(password){
   return bcrypt.compareSync(password,this.password)

}
const User= mongoose.model("user" , userScheme)

module.exports= User