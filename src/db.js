const mongodb = require('mongoose')

// async function dbInit (){
//     await mongodb.connect('mongodb://localhost:27017/UserManagement')
//     let dbConnection = mongodb.connection
//     dbConnection.on('error',()=>{
//         console.log("Error in connecting with database")
//     })
//     dbConnection.once('open',()=>{
//         console.log("Successfully connected to the Database!!!")
//     })
// }



const dbInit = async () => {
    await mongodb.connect('mongodb://127.0.0.1:27017/UserManagement?authSource=admin?ssl=true&retryWrites=false');
  };    
  dbInit()
    .then(() => {
      console.log('Database connected seamlessly :)');
    })
    .catch((err) => console.log(err));


module.exports = { dbInit}


