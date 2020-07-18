const router=require('express').Router();
const User =require('../model/user');
const bcrypt = require('bcrypt');
const jwt= require('jsonwebtoken')

//Validation
const joi =require('@hapi/joi');
const schema= joi.object({
name:joi.string().min(6).required(),
email:joi.string().min(6).required().email(),
password:joi.string().min(6).required()
});


router.post('/register', async (req,res)=>
{
   const {error}= schema.validate(req.body);
     if(error) return res.status(400).send(error.details[0].message);
//If user email already exit in the database
     const emailExit= await User.findOne({email:req.body.email});
     if(emailExit) return res.status(400).send('Email already exit');

// Bcrypt The passwprd
const salt=await bcrypt.genSalt(10);
const hashPassword = await bcrypt.hash(req.body.password,salt);

    const user =  new User({
     name:req.body.name,
      email:req.body.email,
      password:hashPassword
     });
     try{
         const saveduser = await user.save();
         res.send(saveduser);
     }catch(err){
         res.status(400).send(err);
     }
     Console.log(req.body);

});

//Login

const schema1= joi.object({
    email:joi.string().min(6).required().email(),
    password:joi.string().min(6).required()
    });
router.post('/login', async (req,res)=>
{
   const {error}= schema1.validate(req.body);
     if(error) return res.status(400).send(error.details[0].message);
//If user email already exit in the database
     const user= await User.findOne({email:req.body.email});
     if(!user) return res.status(400).send('Email Not found');

// comare password
const vaildPassword = await bcrypt.compare(req.body.password,user.password);
if(!vaildPassword) return res.status(400).send('Invalid Password');

const token=jwt.sign({_id:user._id},'JWTKEY');
res.header('auth-token',token).send(token);
//res.send('Logged In');

});


module.exports=router;