const mongoose = require('mongoose')

const SalesSchema = new mongoose.Schema({
    
    dispatchItem:{
        type:String,
        required:true,
        maxlength: 200,
    },
    dispatchDate: {
        type: Date,
        required:true
    },
    slipNumber:{
        type:Number,
        required:true
    },
    dispatchQuantity: {
        type: Number,
        required: true
    },
    custName: {
        type: String,
        maxlength: 200,
        required: true
    },
    dispatchVehicleNum: {
        type: String,
        required: true
    }

})

module.exports = mongoose.model('sales', SalesSchema)