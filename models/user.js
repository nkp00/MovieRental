const Joi=require('joi');
const mongoose=require('mongoose');
const jwt=require('jsonwebtoken')
const config=require('config')

const userSchema= mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:5,
        maxlength:50
    },
    email:{
        type:String,
        required:true,
        minlength:5,
        maxlength:255,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minlength:5,
        maxlength:1024
    }
})
userSchema.methods.generateToken=function (){
    const token= jwt.sign({_id:this._id},config.get('jwtPrivateKey'));
    return token

}
const User=mongoose.model('users',userSchema)

function validateUser(user){
    const schema={
        name:Joi.string().required().min(5),
        email:Joi.string().min(5).max(255).required().email(),
        password:Joi.string().required().min(5).max(255)
    }
    const result= Joi.validate(user,schema)
    return result;
}

exports.validateUser=validateUser
exports.User=User