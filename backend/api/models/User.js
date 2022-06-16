const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    email:{type:String,required:true,unique:true},
    username:{type:String},
    password:{type:String,required:true},
    profilePic:{type:String,default: "https://res.cloudinary.com/indersingh/image/upload/v1593464618/App/user_mklcpl.png"},
    isAdmin:{type:Boolean,default:false}

},{
    timestamps:true
})

module.exports = mongoose.model("User",UserSchema);