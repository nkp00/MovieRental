const { Genres } = require("../models/genre");
const { Movies, validateMovie } = require("../models/movie");
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  Movies.find()
    .sort("title")
    .then((result) => res.send(result))
    .catch(() => res.send("An error occured"));
});

router.post("/", async (req, res) => {
  const { error } = validateMovie(req.body);
  if (error) return res.send(error.details[0].message);

  try {
    const genre = await Genres.findById(req.body.genreId);
    try {
      const movie = new Movies({
        title: req.body.title,
        genre: {
          id: genre._id,
          name: genre.name,
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate,
      });
      const result = await movie.save();
      // console.log(result)
      return res.send(result)
    } catch(er) {
     return res.send("Internal server error");
    }
    // finally{
    //   console.log("hello")
    // }

    //res.send(result);
  } catch (err) {
    // console.log("")
    return res.send("gener not found");
  }

  // if(!genre) return res.send("Genre not found")

  // const movie = new Movies({
  //       title: req.body.title,
  //       genre:{
  //         id:genre._id,
  //         name:genre.name
  //       },
  //       numberInStock: req.body.numberInStock,
  //       dailyRentalRate: req.body.dailyRentalRate,
  //     });
  // const result = await movie.save()
  // res.send(result)

  // try {
  //   var genre = await Genres.find({ _id: req.body.genreId });
  //   console.log(genre)
  //   const movie = new Movies({
  //     title: req.body.title,
  //     genreId:{
  //       id:genre._id,
  //       name:genre.name
  //     },
  //     numberInStock: req.body.numberInStock,
  //     dailyRentalRate: req.body.dailyRentalRate,
  //   });
  //   console.log(movie);
  //   try {
  //     const result = await movie.save();
  //     res.send(result);
  //   } catch (err) {
  //     res.send(err);
  //   }
  // movie.save()
  // .then
  // ((result)=>{
  //   return res.send(result);
  // })
  // .catch((er)=>{
  //   console.log(er)
  //   return res.send(er)
  // })

  // try {
  //   console.log(movie);
  //   const result = await movie.save();
  //   return res.send(result);
  // } catch {
  //   return res.send("An error occurred");
  // }
  // } catch {
  //     console.log(genre)
  //   return res.send("Genre is not found");
  // }
  // console.log( typeof await Genres.findById(req.body.genreId))
  // console.log(genre, "test");
  // if(!genre) return res.send("Genre is not found")

  // console.log(genre)

  //  try {
  //      const genre = await Promise.reject(5);
  //  } catch (err) {
  //      console.log(err);
  //      //console.log("Inside Catch")
  //  }

  //   const movie = new Movies({
  //     title: req.body.title,
  //     genre: {
  //       _id: genre._id,
  //       name: genre.name,
  //     },
  //     numberInStock: req.body.numberInStock,
  //     dailyRentalRate: req.body.dailyRentalRate,
  //   });
  //   try {
  //       console.log(movie)
  //     const result = await movie.save();
  //     return res.send(result);
  //   } catch {
  //     return res.send("An error occurred");
  //   }
});

module.exports = router;
