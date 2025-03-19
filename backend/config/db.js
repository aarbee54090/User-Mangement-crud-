//Import needed dependies mongoose and dotenv:

const mongoose = require('mongoose');
const dotenv = require('dotenv');
//load the configuration of the dotev
dotenv.config();

//make the function to connect to data base using async:
const connectDB = async()=>{
    try{
        const conn = await mongoose.connect(process.env.MONGODB_URI,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
        });
        // data base connected message: 
        console.log("Connnected Successfully Database");
        // Error message while connecting data  base
    }catch(error){
        console.error(`Error:${error.message}`);
        process.exit(1);
    }
};
//Export the function
module.exports = connectDB