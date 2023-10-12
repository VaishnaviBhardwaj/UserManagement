const mongoose  = require('mongoose');
const UserSchema = new mongoose.Schema({
  
   name : {
    type:String,
    required : true,
   },
   username : {
    type:String,
    required : true,
   },
   userType : {
    type:String,
    required : true,
   },
   password : {
    type:String,
    required : true,
   },
   email : {
    type:String,
    required : true,
   },
   hasAccess:{
      type:Boolean,
   },
   projectList:{
      type:Array,
   }


})

const User = mongoose.model("user", UserSchema);

module.exports = User;