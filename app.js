const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoute = require('./routes/auth');
const protectedRoute = require('./routes/protected');

dotenv.config();
const app = express();

connectDB();

app.use(express.json());

app.get('/',(req,res)=>{
    console.log(req);
    res.send("hello")
})

app.use('/auth',authRoute);
app.use('/protected',protectedRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>console.log(`app is listening port ${PORT}`));