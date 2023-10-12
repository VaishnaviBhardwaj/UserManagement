const mongoose  = require('mongoose');
const ProjectSchema = new mongoose.Schema({
  
   projectname : {
    type:String,
    required : true,
   },
   location : {
    type:String,
    required : true,
   },
   phoneNumber : {
    type:Number,
    required : true,
   },
   email : {
    type:String,
    required : true,
   },
   startDate:{
    type:Date,
    required : true,
   },
   endDate:{
    type:Date,
   }


})

const Project = mongoose.model("project", ProjectSchema);

module.exports = Project;