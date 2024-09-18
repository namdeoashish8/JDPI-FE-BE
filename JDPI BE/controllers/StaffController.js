
const Staff = require('../models/StaffModel')
const VALID_ROLES = ['admin', 'manager', 'driver', 'supervisor', 'helper', 'operator', 'chef', 'security'];
const VALID_GENDER = ['Male', 'Female'];
const VALID_STATUS = ['Active', 'Deactivated'];
phoneFormat=/^[6-9]\d{9}$/;

const addEmployee = async (req, res)=>{
    //business logic
    const {name, phone, role, status, gender } = req.body;

    //Validations
    if(name?.length < 2 || name?.length > 50){
        res.status(400).json({error: "name should have atleast 2 characters and max 50 characters"})
        return;
    }
    if(!phoneFormat.test(phone)){
        res.status(400).json({error: "Phone number should have atleast 10 digits and start above 6..."})
        return;
    }
    if(!VALID_ROLES.includes(role)){
        res.status(400).json({error: "Invalid employee role selected"})
        return;
    }
    if(!VALID_GENDER.includes(gender)){
        res.status(400).json({error: "Please select Male or Female"})
        return;
    }
    if(!VALID_STATUS.includes(status)){
        res.status(400).json({error: "Please select Active or Deactivated as status"})
        return;
    }
    //Saving the data in Cluster
    try {
        //removing duplicates
        const userByPhone= await Staff.findOne({phone: phone})
        if(userByPhone){
            res.status(400).json({error: "Phone number already exists in the system"})
            return;
        }


       const staff = await Staff.create({name, phone, role, status, gender});
       res.status(201).json(staff);
    } catch (error) {
        res.status(401).json({error: "Employee could not be added"});
    }

    // res.end('Employee added on JDPI');
}

const deactivateEmployee = async (req, res) => {
    console.log(req.body)
    const { name, phone } = req.body;
  
    try {
      // Find the employee by ID
      const staffDoc = await Staff.findOne({phone: phone})
  
      if (!employee) {
        return res.status(404).json({ error: 'Employee not found' });
      }
  
      // Update the status to 'Deactivated'
      employee.status = 'Deactivated';
      await employee.save();
  
      res.status(200).json({ message: 'Employee deactivated successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to deactivate employee' });
    }
  };
  


module.exports = {addEmployee, deactivateEmployee}