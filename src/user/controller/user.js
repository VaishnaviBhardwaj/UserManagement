const User = require("../Model/user");
const Project = require("../Model/project");
var bcrypt = require("bcryptjs");
var salt = bcrypt.genSaltSync(10);
var jwt = require('jsonwebtoken');

const secret = 'userManagement'
const client = 'client'

async function createUser(req, res) {
  try {
    let { username, password, email,userType } = req.body;

    let userExit = await User.findOne({ username: username });
    if (userExit) {
      console.log("User already exist with this userName");
      return("User already exist with this userName");
    }
    // Email validation
    let emailExit = await User.findOne({ email: email });
    if (emailExit) {
      console.log("User already exist with this email");
      return("User already exist with this email");
    }

    let haspassword = await bcrypt.hash(password, salt);
    // User Creation
    req.body.password = haspassword;
    let userData = req.body;
    if(userType === client){
        userData.hasAccess = false;
    }
    let userDetails = await User.create( userData );
    return userDetails;
  } catch (err) {
    console.log("Error in creating the User", err);
    return err;
  }
}

async function login(req, res) {
    try {
      let { email, password } = req.body;
  
      let userExist = await User.findOne({ email: email });
      if (!userExist) {
        console.log("Invalid Email");
        return("Invalid Email");
      }
      let haspassword = await bcrypt.compare(password, userExist.password);
      if(!haspassword){
        console.log("Invalid Password");
        return("Invalid Password");
      }
      let tokenbody={
        username:userExist.username,
        usertype: userExist.userType,
      }      
      // token Creation
      let token = jwt.sign({tokenbody},secret)
      let userBody = {
        username:userExist.username,
        usertype: userExist.userType,
        email:userExist.email,
      }
      userBody['id-token'] = token
      
      return  userBody

    } catch (err) {
      console.log("Error in Login", err);
      return err;
    }
}

async function createProject(req,res){
    try {
        let { projectname} = req.body;
    
        let projectExist = await Project.findOne({ projectname: projectname });
        if (projectExist) {
          console.log("Project already exist with this ProjectName");
          return("Project already exist with this ProjectName");
        }
        let projectBody = req.body;
        let projectDetails = await Project.create( projectBody );
        return projectDetails;
      } catch (err) {
        console.log("Error in creating the Project", err);
        return err;
      }

} 

async function readProject(req,res){
    try {
        let { projectName} = req.params;
    
        let projectExist = await Project.findOne({ projectname: projectName });
        if (!projectExist) {
          console.log("No Project Found");
          return("No Project Found");
        }
        return projectExist;
      } catch (err) {
        console.log("Error in Reading the Project", err);
        return err;
      }

} 

async function grantAccess(req,res){
    try {
        let {projectname , username}= req.body;
        let userExist = await User.findOne({ username: username });
        if (!userExist) {
          console.log("No User Found");
          return("No User Found");
        }
        userExist.projectList.push(projectname)
        await User.update({username:username},userExist);
        let permissionUpdate  = await User.findOne({ username: username });
        return permissionUpdate;
      } catch (err) {
        console.log("Error in granting access of the Project", err);
        return err;
      }


}




module.exports = {createUser,login,createProject,readProject,grantAccess}