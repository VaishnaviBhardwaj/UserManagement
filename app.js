const express = require ('express');
const { dbInit } = require('./src/db');
const { createUser, login, createProject,readProject, grantAccess } = require('./src/user/controller/user');
const app = express()
var bodyParser = require('body-parser');
const { checkUser } = require('./src/user/auth');

app.use(bodyParser.json())


app.listen(8080,()=>{
    console.log("Your server is running on 8080")
})

dbInit()

app.get('/',(req , res)=>{
    console.log("Hello thier !!!")
    res.send("Hello thier !!!")
})


app.post('/login',async (req,res)=>{
    await login(req).then((result) => {
        res.send(result)
      })
      .catch((err) => {
        console.log(err)
        res.send(err)
    }
      );
})

app.post('/signup',async(req,res)=>{
    await createUser(req).then((result) => {
        res.send(result)
      })
      .catch((err) => {
        console.log(err)
        res.send(err)
    }
      );
})

// for this Using Project Name For Now
app.get('/project/:projectName',checkUser,async(req,res)=>{
    await readProject(req).then((result) => {
        res.send(result)
      })
      .catch((err) => {
        console.log(err)
        res.send(err)
    }
      );
})

app.post('/project',async(req,res)=>{
    await createProject(req).then((result) => {
        res.send(result)
      })
      .catch((err) => {
        console.log(err)
        res.send(err)
    }
      );
})
app.post('/grantAccess',async(req,res)=>{
    await grantAccess(req).then((result) => {
        res.send(result)
      })
      .catch((err) => {
        console.log(err)
        res.send(err)
    }
      );
})