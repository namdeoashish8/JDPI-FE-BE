const mongoose =require('mongoose');

const Inventory = new mongoose.Schema({
   itemName:{
    type:String,
    required:true,
    maxlength:50
   },
   itemCategory:{
    type:String,
    required:true,
   },
   itemQuantity:{
    type:Number,
    required:true
   },
   itemMeasurement:{
    type:String,
    required:true
   },
   inventoryAddDate:{
    type:Date,
    required:true
   },
   remarks:{
    type:String,
    required:true
   }
})

module.exports = mongoose.model('inventory', Inventory)