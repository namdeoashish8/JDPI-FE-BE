const mongoose = require('mongoose')

const AttendanceSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    date:{
        type: Date,
        default: Date.now,
        required:true
    },
    checkInTime: {
        type: String, // Store the time as a string
        required: true
    },
    checkOutTime: {
        type: String, // Store the time as a string
        required: true
    },
    presentStatus: {
        type: String,
        enum: ['Present', 'Absent', 'On Leave'],
        required: true,
    },
    remarks: {
        type: String,
        maxlength: 200,
    }

})

module.exports = mongoose.model('attendance', AttendanceSchema)