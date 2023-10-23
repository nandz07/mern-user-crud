const mongoose=require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema=new mongoose.Schema({
    name:String,
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    phonenumber:Number,
    isAdmin: {
        type: Boolean,
        default: false,
      },
      pic: {
        type: String,
      },
})
const UserModel=mongoose.model("users",UserSchema);
module.exports=UserModel;