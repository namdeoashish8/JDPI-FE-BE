const Inventory  = require('../models/InventoryModel')
const ITEM_CATEGORY=['Machine','Parts','Office','Stationary','Tools','Kitchen','Water','Fuel','Others']

const addInventory = async(req,res)=>{
    const {itemName,itemCategory,itemQuantity,itemMeasurement,inventoryAddDate,remarks} = req.body;
    try {
        const inventoryItem = await Inventory.create({itemName,itemCategory,itemQuantity,itemMeasurement,inventoryAddDate,remarks});
        res.status(200).json({inventoryItem, message: 'Inventory Item got created susccefully'})
        
    } catch (error) {
        res.status(401).json({error:'Inventory item could not be created'});
    }
}

const viewInventory = async(req,res)=>{
  const {itemName,itemCategory} = req.query;
  let filter = {};
  if (itemName) filter.itemName = itemName;
  if (itemCategory) filter.itemCategory = itemCategory;
  try {
    const inventoryRecord=await Inventory.find(filter)
    res.status(200).json({inventoryRecord,message:'Inventory fetched successfully'})
  } catch (error) {
    res.status(401).json({error:'Inventory item couldnot be fetched'})
  }
}
module.exports ={addInventory,viewInventory};