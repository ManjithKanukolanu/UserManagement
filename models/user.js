const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    ID:{
        type:Number,
        required: true
    },
    Name:{
        type:String,
        required:true
    },
    Email:{
        type:String,
        required:true,
        unique:true
    },
    Gender:String,
    Status:String
});
const user = mongoose.model('user',userSchema)
module.exports = user