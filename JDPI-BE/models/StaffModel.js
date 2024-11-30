const mongoose = require('mongoose')

const StaffSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    }

})

module.exports = mongoose.model('staff', StaffSchema)