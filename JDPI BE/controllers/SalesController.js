const Sales = require('../models/SalesModel')

const VALID_DispatchItem = ['M Sand', 'GSB', '20mm', 'Dust', 'Murum'];

const addDispatch = async (req,res)=>{
    const {dispatchItem, dispatchDate, slipNumber, dispatchQuantity, custName, dispatchVehicleNum} = req.body;

    //Validations
    if(custName?.length < 2 || custName?.length > 50){
        res.status(400).json({error: "Customer name should have atleast 2 characters and max 50 characters"})
        return;
    }
    if(slipNumber < 0){
        res.status(400).json({error: "Slip Number cannot be empty"})
        return;
    }
    if(dispatchQuantity < 1){
        res.status(400).json({error: "Atleast 1 Ton quantity is needed"})
        return;
    }
    if(!VALID_DispatchItem.includes(dispatchItem)){
        res.status(400).json({error: "Select the Dispatch item please"})
        return;
    }
    //Saving the data in Cluster
    try {
        const dispatch = await Sales.create({dispatchItem, dispatchDate, slipNumber, dispatchQuantity, custName, dispatchVehicleNum});
       res.status(200).json({dispatch, message: 'Dipatch added successfully'});
    } catch (error) {
        res.status(401).json({error: "Dipatch could not be added"});
    }
}

module.exports={addDispatch}