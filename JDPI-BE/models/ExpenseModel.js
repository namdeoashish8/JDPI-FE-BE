const mongoose = require('mongoose')

const ExpenceSchema = new mongoose.Schema({
    itemName:{
        type:String,
        required:true,
        maxlength: 200,
    },
    itemPrice:{
        type:Number,
        required:true
    },
    itemQuantity: {
        type: Number,
        required: true
    },
    boughtDate: {
        type: Date,
        required:true
    },
    itemCategory: {
        type: String, // Store the time as a string
        required: true
    },
    remarks: {
        type: String,
        maxlength: 200,
    }

})

module.exports = mongoose.model('expense', ExpenceSchema)