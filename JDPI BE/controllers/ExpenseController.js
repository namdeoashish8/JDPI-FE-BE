const Expense = require('../models/ExpenseModel')

const VALID_ITEMCATEGORY = ['Machine Parts', 'Office', 'Stationary', 'Kitchen', 'Water', 'Fuel', 'others'];

const addExpense = async(req,res)=>{
    const {itemName, itemPrice, itemQuantity, boughtDate, itemCategory, remarks } = req.body;

    //Validations
    if(itemName?.length < 2 || itemName?.length > 50){
        res.status(400).json({error: "Item name should have atleast 2 characters and max 50 characters"})
        return;
    }
    if(itemPrice < 0){
        res.status(400).json({error: "Item Price cannot be lesser than 0"})
        return;
    }
    if(itemQuantity < 1){
        res.status(400).json({error: "Atleast 1 quantity is needed"})
        return;
    }
    if(!VALID_ITEMCATEGORY.includes(itemCategory)){
        res.status(400).json({error: "Select the Category please"})
        return;
    }
    //Saving the data in Cluster
    try {
        //removing duplicates
        const expense = await Expense.create({itemName, itemPrice, itemQuantity, boughtDate, itemCategory, remarks});
       res.status(200).json({expense, message: 'Expense added successfully'});
    } catch (error) {
        res.status(401).json({error: "Expense could not be added"});
    }
}

const viewExpense = async (req,res) =>{

}

module.exports = {addExpense, viewExpense}