const mongoose = require('mongoose');
require('dotenv').config()

const connectDB = async () =>{
    try{
        if(!process.env.MONGOURL){
            console.log('MONGOURL missing, please fill environment variables.');
            process.exit(0);
        }
        await mongoose.connect(process.env.MONGOURL,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
        });
        console.log('Database connected.');
    }
    catch(err){
        console.log(err);
    }
}
module.exports = connectDB;