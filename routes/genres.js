const express = require("express");
const router = express.Router();
const { Genres, validate } = require("../models/genre");
const { func } = require("joi");
const mongoose=require('mongoose')
const validateId=require('../middleWare/validateId')
const auth=require('../middleWare/auth')

// function asyncMiddle (handle){
//   return function(req, res,next){
//     try {
//        handle(req,res)
//       //  next()
//      }
//      catch(er){
//       res.send("Internal server error")
//      }
//   }

// }
// A factory fucntion to avoid repeatative try and catch blocks.
function asyncMiddle(handler) {
  return async (req,res,next) => {
    try {
     await handler(req, res);
    } catch (ex) {
      next(ex);
    }
  }; 
}

router.get("/",asyncMiddle(async(req, res, next) => {
    const genre = await Genres.find().sort("name");
    res.send(genre);
}));

// router.get("/", async (req, res) => {

//   const genre=await Genres.find().sort('name')
//   res.send(genre)

// });

router.post("/",auth,  async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let genre = new Genres({
    name: req.body.name,
  });
  genre=await genre.save()
  if(genre) return res.send(genre)
  // genre
  //   .save()
  //   .then((result) => {
  //     console.log(result);
  //     return res.send(result);
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //     return res.send(error);
  //   });
});

router.get("/:id", async (req, res) => {
  const id=validateId(req.params.id)
  if(!id)  return res.status(400).send("Invalid ID")

  const genre = await Genres.findOne({ _id: req.params.id });
  if (!genre) res.status(404).send("Genres do not exist");
  return res.send(genre);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  Genres.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    { new: true }
  )
    .then((result) => {
      return res.send(result);
    })
    .catch((error) => {
      return res.send("Item with given ID not found");
    });
});

router.delete("/:id", (req, res) => {
  Genres.findByIdAndRemove(req.params.id)
    .then((result) => {
      return res.send(result);
    })
    .catch((error) => {
      return res.send("Item with given ID not found");
    });
});

module.exports = router;
