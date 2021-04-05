const Joi = require("joi");
const mongoose = require("mongoose");
const {genreSchema}=require('./genre')
const movieSchema=mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true,
        minLength:5
    },
    genre:{
        type:genreSchema,
        required:true
    },
    // genre:{
    //     type:String,
    //     required:true
    // },
    numberInStock:{
        type:Number,
        min:0,
        max:250,
        required:true
    },
    dailyRentalRate:{
        type:Number,
        min:0,
        max:250,
        required:true
    }
})
const Movies=mongoose.model('Movie',movieSchema)

const schema={
    title:Joi.string().required().min(5),
    genreId:Joi.string().required(),
    numberInStock:Joi.number().required().min(0).max(250),
    dailyRentalRate:Joi.number().required().min(0).max(250),
}
function validateMovie(movie){
    return Joi.validate(movie,schema)
}
exports.Movies=Movies,
exports.validateMovie=validateMovie