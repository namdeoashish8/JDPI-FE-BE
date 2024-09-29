import { Box, Button } from "@mui/material";
import { useMemo, useState } from "react";
import { useTable } from "react-table";
import TextField from "@mui/material/TextField";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import snackbar from "../../utility/snackbar";

const ViewAttendance = () => {
  let dateStartVar = Date();
  let dateEndVar = Date();
  const [startDate, setStartDate] = useState(dayjs(dateStartVar));
  const [endDate, setEndDate] = useState(dayjs(dateEndVar));
  const [phone, setPhone] = useState();
  const [openTable, setOpenTable] = useState(false);
  const [presenceRecords, setpresenceRecords] = useState({
    name:"",
    phone:"",
    dateEndVar: "",
    setCheckInTime: "",
    checkOutTime: "",
    presentStatus: "",
    remarks: "",
  });

  const handleCloseButton = async ()=>{
    await setOpenTable(false);
    await resetForm();
  }


  // Fetch data from the backend
  const fetchEmployeePresence = async (event) => {
    setOpenTable(true); //Will render the table
    event.preventDefault();
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/v1/attendance/view-attendance`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            phone: phone, 
            startDate: startDate, 
            endDate: endDate   
          }),
        }
      );
      
      const data = await response.json();
      console.log(data);
      if (response.status == 200) {
        setpresenceRecords(data.attendanceRecords);
        if (data.attendanceRecords && data.attendanceRecords.length > 0) {
          snackbar("success", `${data.message} for ${data.attendanceRecords[0].name}`);
        } else {
          snackbar("error", "No attendance records found.");
        }
        // resetForm();
      } else {
        console.log(data.error);
        snackbar("error", data.error);
      }
    }
    catch (error) {
      console.error("Error in fetching staff data", error);
    }
  }
  const resetForm = () => {
    setPhone("");
    setStartDate(dayjs()); 
    setEndDate(dayjs());
  }
  
  //Inputting data to the table
  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Phone",
        accessor: "phone",
      },
      {
        Header: "Date",
        accessor: "date",
      },
      {
        Header: "Check-In Time",
        accessor: "checkInTime",
      },
      {
        Header: "Check-Out Time",
        accessor: "checkOutTime",
      },
      {
        Header: "Status",
        accessor: "presentStatus",
      },
      {
        Header: "Remarks",
        accessor: "remarks",
      },
    ],
    []
  );
  const presenceData = useMemo(() => (Array.isArray(presenceRecords) ? presenceRecords : []), [presenceRecords]);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data: presenceData });



  return (
    <div className="viewAttendance-container baskervville-sc-regular">
      <div>
        <h2>View Attendance</h2>
      </div>
      <div className="viewAttendance-Subcontainer">
        <div className="viewAttendanceForm-box">
        <h2>Please fill below fields to view for an employee</h2>
        <Box
        component="form"
        noValidate
        autoComplete="off"
        sx={{
          marginLeft: "120px",
          marginTop:"30px",
          width: "250px"
        }}
        >
          <TextField
          id="standard-basic"
          label="Employee Phone Number"
          variant="outlined"
          type="Number"
          required
          fullWidth

          value={phone}
          onChange={e => setPhone(e.target.value)}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer
                components={[
                  "DatePicker",
                  "DesktopDatePicker",
                ]}
              >
                <div className="viewAttendance-datepicker">
                  <DemoItem label="Start Date of presence/absence ">
                    <DesktopDatePicker 
                      value={startDate}
                      onChange={(newValue)=>setStartDate(newValue)}/>
                  </DemoItem>
                  <DemoItem label="End Date of presence/absence">
                    <DesktopDatePicker value={endDate} onChange={(newValue)=>setEndDate(newValue)}/>
                  </DemoItem>
                </div>
              </DemoContainer>
            </LocalizationProvider>
            <Button
              variant="contained"
              fullWidth
              sx={{
                marginTop: "20px",
                marginBottom: "20px"
              }}
              onClick={fetchEmployeePresence}
            >
              View Attendance
            </Button>
        </Box>
        </div>
        {/* Table */}
      {!openTable ? (
        <div className="emptyTable attendanceTable">
          <h2>Submit employee details to view attendance</h2>
        </div>
      ) : (
        <div className="attendanceTable">
          <h2>Actual employee details to view attendance</h2>
          <table
          {...getTableProps()}
          style={{ border: "1px solid black", margin: "auto", width: "95%", fontFamily: "Arial, sans-serif"}}
        >
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps()}
                    key={column.id}
                    style={{ border: "1px solid black", padding: "10px" }}
                  >
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} key={row.id}>
                  {row.cells.map((cell) => (
                    <td
                      {...cell.getCellProps()}
                      key={cell.column.id}
                      style={{ border: "1px solid black", padding: "10px", fontSize: "12px"}}
                    >
                      {/* Check if the column is the 'date' column, apply date formatting */}
                        {cell.column.id === 'date' 
                          ? new Date(cell.value).toLocaleDateString('en-CA')  // Format date to YYYY-MM-DD
                              : cell.render("Cell")
                        }
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
          <Button onClick={handleCloseButton}>Close</Button>
        </div>
      )}
      </div>
     
      
    </div>
  )
}

export default ViewAttendance
