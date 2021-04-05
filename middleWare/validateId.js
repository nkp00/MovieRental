const mongoose=require('mongoose')

module.exports=function validateId(id){
    return mongoose.Types.ObjectId.isValid(id)
}