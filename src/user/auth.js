
var jwt = require('jsonwebtoken');
const User = require("./Model/user");
let secret = 'userManagement'
const client = 'client'
let roles= {
    'admin':{
        route:['/project','/user']
    },
    'client':{
        route:['/user']
    }
}


async function checkUser(req,res,next){
    try{
        let idToken = req.headers['id-token']
        let url =trim(req)
        let decodeToken = jwt.decode(idToken)
        let role = decodeToken.tokenbody.usertype
        let username =  decodeToken.tokenbody.username
        if(role === client && url === '/project'){
            let userDetails = await User.findOne({username:username})
            if(userDetails.hasAccess && userDetails.projectList.includes(req.params.projectName)){
                next()
            }
            else{
                res.send("Access Denied")
            }
        
        }
        else{
            next()
        }

 

    }catch(err){
        console.log("Error in Check User Access",err)
        res.send("Error in Check User Access")
    }

}


function trim(req) {
    let url = req.url
    if (Object.keys(req.query).length && Object.keys(req.params).length) {
        let queryTrimedUrl = url.substring(0, url.lastIndexOf('?'))
        return queryTrimedUrl.substring(0, url.lastIndexOf('/'))
    } else if (Object.keys(req.query).length) {
        return url.substring(0, url.lastIndexOf('?'))
    } else if (Object.keys(req.params).length) {
        for (let param of Object.keys(req.params)) {
            url = url.replace("/" + req.params[param], "");
        }
        return url
    } else if (url[url.length - 1] == '/') {
        return url.substring(0, url.lastIndexOf('/'))
    } else {
        return url
    }
}

module.exports = {checkUser}