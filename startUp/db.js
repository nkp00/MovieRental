const mongoose = require("mongoose");

module.exports=function(){
mongoose
  .connect("mongodb://localhost/project", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected to DataBase");
  })
  .catch(() => console.log("an error occured , Could not connect to MongoDB"));
}