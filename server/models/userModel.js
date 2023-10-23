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
        required: true,
        default:
          "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
      },
})
// UserSchema.methods.matchPassword = async function (enteredPassword) {
//     return await bcrypt.compare(enteredPassword, this.password);
//   };
  
//   // will encrypt password everytime its saved
//   UserSchema.pre("save", async function (next) {
//     if (!this.isModified("password")) {
//       next();
//     }
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
//   });
const UserModel=mongoose.model("users",UserSchema);
module.exports=UserModel;