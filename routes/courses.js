const express = require("express");
const router = express.Router();
const Joi = require("joi");
const mongoose = require("mongoose");
const courseSchema = mongoose.Schema({
  name: { type: String, required: true },
});
const Course = mongoose.model("Courses", courseSchema);

// const Courses = [
//     { id: 1, name: "Node" },
//     { id: 2, name: "React" },
//   ];

router.get("/", (req, res) => {
  Course.find()
    .sort("name")
    .then((result) => {
      return res.send(result);
    })
    .catch((error) => {
      return res.send(error);
    });
});

const schema = {
  name: Joi.string().required().min(3),
};

router.post("/", (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const course = new Course({
    name: req.body.name,
  });
  course
    .save()
    .then((result) => {
      console.log(result);
      return res.send(result);
    })
    .catch((error) => {
      console.log(error);
      return res.send(error);
    });
  // const course = {
  //   id: Courses.length + 1,
  //   name: req.body.name,
  // };
  // Courses.push(course);
  // res.send(course);
});

router.get("/:id", async (req, res) => {
  // const course = Courses.find((course) => {
  //   return course.id === +req.params.id;
  // });
  const course = await Course.findOne({ _id: req.params.id });
  if (!course) res.status(404).send("Course not found");
  return res.send(course);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  Course.findByIdAndUpdate(req.params.id,{name:req.body.name},{new:true})
  .then((result)=>{
   return res.send(result)
  })
  .catch((error)=>{
    return res.send("Item with given ID not found")
  })

  // let course = await Course.findByIdAndUpdate(
  //   req.params.id,
  //   { name: req.body.name },
  //   { new: true }
  // );
  // if (!course) {
  //   return res.status(404).send("Item with given Id not found");
  // }
  // return res.send(course);

  // let index = Courses.findIndex((course) => {
  //   return course.id === +req.params.id;
  // });
  // if (index != -1) {
  //   Courses[index] = {
  //     id: req.params.id,
  //     name: req.body.name,
  //   };
  //   return res.send(Courses[index]);
  // }
  // res.status(400).send("Item not found");
});

router.delete("/:id",(req, res) => {
  Course.findByIdAndRemove(req.params.id)
  .then((result)=>{
    return res.send(result)
  })
  .catch((error)=>{
    return res.send("Item with given ID not found")
  })
  // const course = await Course.findByIdAndRemove(req.params.id);
  // if (!course) {
  //   return res.status(404).send("Item not found");
  // }
  // return res.send(course);
  // const course = Courses.find((course) => {
  //   return course.id === +req.params.id;
  // });
  // console.log(course);
  // if (!course) return res.status(404).send("Course not found");
  // Courses.splice(Courses.indexOf(course), 1);
  // res.send(course);
});

function validate(course) {
  const result = Joi.validate(course, schema);
  return result;
}

module.exports = router;
