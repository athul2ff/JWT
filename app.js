const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();
const app = express();

connectDB();

app.get('/',(req,res)=>{
    console.log(req);
    res.send("hello")
})

const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>console.log(`app is listening port ${PORT}`));