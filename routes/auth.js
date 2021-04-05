const express=require('express');
const router=express.Router()
const Joi=require('joi');
const { User } = require('../models/user');
const bcrypt=require('bcrypt');


router.post('/',async (req,res)=>{
    const {error}=validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const user= await User.findOne({email:req.body.email});
    if(!user) return res.status(400).send("Invalid email or password");

    const validPassword=await bcrypt.compare(req.body.password,user.password);
    if(!validPassword) return res.status(400).send("Invalid email or password");

    // res.send(true)
   const token=user.generateToken();
   res.send(token)

})

function validate(user){
    const schema={
        email:Joi.string().email().required(),
        password:Joi.string().required().min(5)
    }
    return Joi.validate(user,schema)
}






module.exports=router