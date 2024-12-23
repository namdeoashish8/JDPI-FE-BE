const Staff = require("../models/StaffModel");
const Attendance = require("../models/AttendanceModel");
const VALID_ROLES = [
  "admin",
  "manager",
  "driver",
  "supervisor",
  "helper",
  "operator",
  "chef",
  "security",
];
const VALID_GENDER = ["Male", "Female"];
const VALID_STATUS = ["Active", "Deactivated"];
const VALID_PRESENTSTATUS = ["Present", "Absent", "On Leave"];
phoneFormat = /^[6-9]\d{9}$/;

//staff management
const addEmployee = async (req, res) => {
  //business logic
  const { name, phone, role, status, gender } = req.body;

  //Validations
  if (name?.length < 2 || name?.length > 50) {
    res
      .status(400)
      .json({
        error: "name should have atleast 2 characters and max 50 characters",
      });
    return;
  }
  if (!phoneFormat.test(phone)) {
    res
      .status(400)
      .json({
        error:
          "Phone number should have atleast 10 digits and start above 6...",
      });
    return;
  }
  if (!VALID_ROLES.includes(role)) {
    res.status(400).json({ error: "Invalid employee role selected" });
    return;
  }
  if (!VALID_GENDER.includes(gender)) {
    res.status(400).json({ error: "Please select correct gender" });
    return;
  }
  if (!VALID_STATUS.includes(status)) {
    res
      .status(400)
      .json({ error: "Please select Active or Deactivated as status" });
    return;
  }
  //Saving the data in Cluster
  try {
    //removing duplicates
    const userByPhone = await Staff.findOne({ phone: phone });
    if (userByPhone) {
      res
        .status(400)
        .json({ error: "Phone number already exists in the system" });
      return;
    }

    const staff = await Staff.create({ name, phone, role, status, gender });
    res.status(201).json(staff);
  } catch (error) {
    res.status(401).json({ error: "Employee could not be added" });
  }

  // res.end('Employee added on JDPI');
};

const updateEmloyee = async (req, res) => {
  const { name, phone, role } = req.body;

  if (name?.length < 2 || name?.length > 50) {
    res
      .status(400)
      .json({
        error: "name should have atleast 2 characters and max 50 characters",
      });
    return;
  }
  if (!phoneFormat.test(phone)) {
    res
      .status(400)
      .json({
        error:
          "Phone number should have atleast 10 digits and start above 6...",
      });
    return;
  }
  if (!VALID_ROLES.includes(role)) {
    res.status(400).json({ error: "Invalid employee role selected" });
    return;
  }
  try {
    const employee = await Staff.findOne({phone:phone})
    if(!employee){
      return res.status(400).json({error:"Employee not found!!"})
    }
    if(name){
      employee.name=name;
    }
    if(phone){
      employee.phone=phone;
    }
    if(role){
      employee.role=role;
    }
    await employee.save();
    res.status(200).json({message: "Employee details updated successfully",employee})
  } catch (error) {
    console.log(error);
    res.status(500).json({error:"Failed to update employee"})
  }
};

const deactivateEmployee = async (req, res) => {
  console.log(req.body);
  const { phone } = req.body;

  try {
    // Find the employee by ID
    const staffDoc = await Staff.findOne({ phone: phone });

    if (!staffDoc) {
      return res.status(404).json({ error: "Employee not found" });
    }

    // Update the status to 'Deactivated'
    staffDoc.status = "Deactivated";
    await staffDoc.save();

    res.status(200).json({ message: "Employee deactivated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to deactivate employee" });
  }
};

const fetchEmployee = async (req, res) => {
  try {
    const employees = await Staff.find({
      status: { $in: ["Active","Deactivated"] },
    });
    res.status(200).json({ employees });
  } catch (error) {
    res.status(400).json({ error: "Failed to fetch employees" });
  }
};

//Attendance Methods
const markAttendance = async (req, res) => {
  const {
    name,
    phone,
    date,
    checkInTime,
    checkOutTime,
    presentStatus,
    remarks,
  } = req.body;
  const existingAttendance = await Attendance.findOne({ phone, date }); // Check if record for today exists
  const existingEmployee = await Staff.findOne({ phone }); // Check if record for employee exists

  if (!existingEmployee) {
    return res.status(400).json({ error: "Employee does not exist" });
  } else {
    if (existingAttendance) {
      if (!VALID_PRESENTSTATUS.includes(presentStatus)) {
        return res
          .status(400)
          .json({ error: "Please select Present, Absent or On Leave" });
      } else {
        Attendance.updateOne(
          { phone: existingAttendance.phone }, //searching by id (should search by phone)
          { presentStatus, checkInTime, checkOutTime, remarks }
        );
        return res
          .status(200)
          .json({ message: "Attendance marked successfully" });
      }
    } else {
      if (!VALID_PRESENTSTATUS.includes(presentStatus)) {
        return res
          .status(400)
          .json({ error: "Please select Present, Absent or On Leave" });
      } else {
        Attendance.create({
          name,
          phone,
          date,
          checkInTime,
          checkOutTime,
          presentStatus,
          remarks,
        });
        return res
          .status(200)
          .json({ message: "Attendance marked successfully" });
      }
    }
  }
};

const getAttendanceForEmployee = async (req, res) => {
  const { phone, startDate, endDate } = req.body;

  try {
    const attendanceRecords = await Attendance.find({
      phone,
      date: {
        $gte: new Date(startDate), // Greater than or equal to startDate
        $lte: new Date(endDate), // Less than or equal to endDate
      },
    });

    res
      .status(200)
      .json({ attendanceRecords, message: "Attendance fetched successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve attendance records" });
  }
};

module.exports = {
  addEmployee,
  updateEmloyee,
  deactivateEmployee,
  fetchEmployee,
  markAttendance,
  getAttendanceForEmployee,
};
