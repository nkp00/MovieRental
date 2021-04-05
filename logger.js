// const EventEmitter = require("events");
// class Logger extends EventEmitter {
//   log(msg) {
//     console.log("hello" + msg);

//     this.emit("messageLogged", {
//       name: "neeraj",
//       id: 1,
//     });
//   }
// }

// module.exports =Logger;
function logger (req,res,next){
  console.log("In the middle ware")
  next();
}
module.exports=logger