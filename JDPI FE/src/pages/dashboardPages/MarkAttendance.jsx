import { Box, Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import snackbar from "../../utility/snackbar";
import { useState } from "react";

const MarkAttendance = () => {
  {
    /* name, phone, date, checkInTime, checkOutTime, presentStatus, remarks */
  }
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState(dayjs()); // Initialize with current date
  const [checkInTime, setCheckInTime] = useState(dayjs()); // Initialize with current time
  const [checkOutTime, setCheckOutTime] = useState(dayjs());
  const [presentStatus, setpresentStatus] = useState("");
  const [remarks, setRemarks] = useState("");

  const submitAttendance = async () => {
    console.log(
      name,
      phone,
      date.format('YYYY-MM-DD'),         // Format the date
      checkInTime.format('HH:mm'),        // Format the check-in time
      checkOutTime.format('HH:mm'),       // Format the check-out time  
      presentStatus,
      remarks
    );
    console.log(`API URL: ${import.meta.env.VITE_BASE_URL}`);
    // console.log(`Base URL: ${import.meta.env.VITE_BASE_URL}`);
    const response = await fetch(
      `${import.meta.env.VITE_BASE_URL}/api/v1/attendance/mark-attendance`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          phone,
          date: date.format('YYYY-MM-DD'), 
          checkInTime: checkInTime.format('HH:mm'),  // Format time properly
          checkOutTime: checkOutTime.format('HH:mm'),
          presentStatus,
          remarks,
        }),
      }
    );

    const data = await response.json();
    if (response.status == 201) {
      snackbar("success", `Attendance marked for the ${phone}`); //Appended phone number with use of ` `
      resetForm();
    } else {
      snackbar("error", data.error);
    }
  };

  const resetForm = () => {
    setName("");
    setPhone("");
    setDate("");
    setCheckInTime("");
    setCheckOutTime("");
    setpresentStatus("");
    setRemarks("");
  };

  return (
    <div className="markAttendanceContainer baskervville-sc-regular">
      <div className="singleAttendanceContainer">
        <h2>Complete the below fields to mark attendance</h2>
        <Box
          className="singleAttendanceBox"
          component="form"
          noValidate
          autoComplete="on"
        >
          <TextField
            id="standard-basic"
            label="Full name"
            variant="standard"
            required
            sx={{ margin: "15px" }}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            id="standard-basic"
            label="Phone Number"
            variant="standard"
            type="number"
            required
            sx={{ margin: "15px" }}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <div className="custom-datetimepicker">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["MobileDatePicker"]}>
                <div className="custom-datepicker">
                  <DemoItem label="Date of presence/absence">
                    <MobileDatePicker 
                        defaultValue={dayjs("2022-04-17")} 
                        value={date} 
                        onChange={(newValue) => setDate(dayjs(newValue))}/>
                  </DemoItem>
                </div>
                <div className="custom-timepicker">
                  <TimePicker label="check-In Time" 
                    value={checkInTime} 
                    onChange={(newValue) => setCheckInTime(dayjs(newValue))} />
                  <TimePicker label="check-Out Time" 
                    value={checkOutTime} 
                    onChange={(newValue) => setCheckOutTime(dayjs(newValue))}/>
                </div>
              </DemoContainer>
            </LocalizationProvider>
          </div>
          <div className="secondAttendanceBox">
            <InputLabel id="demo-simple-select-label">
              Present Status
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={presentStatus}
              label="PresentStatus"
              // onChange={handleStatusChange}
              onChange={(e) => setpresentStatus(e.target.value)}
              // const handleStatusChange = (event) => {
              //   setpresentStatus(event.target.value);
              // };
              sx={{ width: "250px" }}
            >
              <MenuItem value={"Present"}>Present</MenuItem>
              <MenuItem value={"Absent"}>Absent</MenuItem>
              <MenuItem value={"On Leave"}>On Leave</MenuItem>
            </Select>
            <TextField
              id="standard-basic"
              label="Remarks (upto 20 words)"
              variant="standard"
              type="String"
              sx={{ margin: "15px", width: "300px" }}
              value={remarks}
              onChange={e => setRemarks(e.target.value)}
            />
          </div>

          <Button
            variant="contained"
            sx={{
              padding: "5px",
              marginTop: "20px",
              marginLeft: "170px",
              width: "150px",
            }}
            onClick={submitAttendance}
          >
            {" "}
            Submit
          </Button>
        </Box>
      </div>
      <div className="multipleAttendanceContainer">
        <h2>Mark attendance for multiple employees - Yet to arrive</h2>
      </div>
    </div>
  );
};

export default MarkAttendance;
