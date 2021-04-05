// const Logger=require('./logger')
// const logger=new Logger()
// logger.on('messageLogged',(res)=>{
//     console.log(res)
// })
// logger.log("nkp")

// const http=require('http')

// const server=new http.createServer((req,res)=>{
//     if(req.url==='/'){
//         res.write("Hello World")
//         res.end()
//     }
//     if(req.url==='/api'){
//         res.write(String([1,2,3,4]))
//         res.end()
//     }

// })






const config=require('config');
require('express-async-errors')
const error=require('./middleWare/error')
const express = require("express");
const Joi=require('joi');
Joi.objectId=require('joi-objectid')(Joi)

var app = express();
app.use(express.json());

if(!config.get('jwtPrivateKey')){
  console.error('FATAL ERROR: jwtPrivateKey is not defined')
  process.exit(1)
}

require('./startUp/db')()
require('./startUp/routes')(app)

app.use(error)

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listenning to ${port}..............`);
});












/*

// const mongo=require('mongodb').MongoClient
const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/playground',{ useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>{
  console.log("connected")
})
.catch(()=>console.log("an error occured"))

const courseSchema= new mongoose.Schema({
  name:{type:String, required:true},
  author:String,
  tags:[],
  date:{type:Date, default:Date.now},
  isPublished:Boolean,
  price:Number
})
const Course=mongoose.model('Course',courseSchema)

async function createCourse(){

  const course=new Course({
    name:"Chrome",
    author:'Mosh',
    tags:['frontend','framework'],
    isPublished:true,
    price:20
  })
  try{
    const result= await course.save();
    console.log(result)
    // await course.validate();
  }
  catch(er){
    console.log(er.message)
  }
  
  // console.log("*************")
}
createCourse();

async function getCourse(){
 const courses= await Course
 .find({author:'Mosh',isPublished:true})
 .skip()
 .limit(10)
 .sort({name:1})
 .select({name:1,tags:1})
 
 console.log(courses)
}

// getCourse()

async function updateCourse(id){
  //Approach: Query first
  // findbyID
  //Modify its properties
  //save

  // const course = await Course.findById(id);
  // if(!course) return;
  // course.isPublished=true;
  // course.author="Another Author";
  // course.set({
  // it takes the key value pair to be updated
  // })
  // const result=await course.save();
  // console.log(result)

  // Approach:Update first
  // Update Directly

  const course=await Course.update({_id:id},{
    $set:{
      author:'Mosh Hamedani',
      isPublished:false
    }
  })
  // if(!course) return;

  // const result=await course
  console.log(course)

}
// updateCourse('5ef4868f9762cd0dbc2012d5')

async function removeCourse(id){
  const result = await Course.deleteOne({_id:id})
  console.log(result)
}
// removeCourse("5ef4868f9762cd0dbc2012d5")


*/





