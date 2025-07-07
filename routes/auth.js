const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require ("jsonwebtoken");
const dotenv = require("dotenv");
const User = require("../models/user");

dotenv.config();

const router = express.Router()

router.post('/login',async(req,res)=>{
    const {email,password} = req.body;

    try {
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({error:"Invalid credentials"})
        }

        const verify = await bcrypt.compare(password,user.password);

        if(!verify){
            return res.status(400).json({error:"Password is incorrect"})  
        }

        const payload = {
            user:{
                id:user.id
            }
        }

        jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:3600},(error,token)=>{
            if(error) throw error;
            res.status(200).json({token});
        })

    } catch (error) {
            return res.status(500).json({error:error.message})  
    }
    
})

router.post('/register',async(req,res)=>{
    const {email,name,password} = req?.body;

    try {
      let user = await User.findOne({email});       

      if(user){
        return res.status(400).json({error:"User already exist"});
      }
      user = new User({name,email,password});

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password,salt);
      await user.save();

      return res.status(201).json({message:"User successfully registered."})
        
    } catch (error) {
        res.status(500).json({error:error.message})
    }
})


module.exports = router;