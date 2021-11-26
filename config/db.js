const mongoose = require('mongoose');
const dotenv = require('dotenv')
const connectDB = async ()=>{
  const conn = await  mongoose.connect("mongodb+srv://Vijayakumar:gzH6QzbUcYEjRKcj@cluster0.ise85.mongodb.net/dms?retryWrites=true&w=majority",{
useNewUrlParser:true,
useCreateIndex:true,
useFindAndModify:false,
useUnifiedTopology:true
  });

  console.log(`Mongodb Connected ${conn.connection.host}`)
}

module.exports = connectDB;