import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import snackbar from "../../utility/snackbar";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { useState } from "react";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

const ExpenseReport = () => {
  const [expenseCategory, setExpenseCategory] = useState();
  let expenseStartDateVar = Date();
  let expenseEndDateVar = Date();
  const [expenseStartDate, setStartDate] = useState(dayjs(expenseStartDateVar));
  const [expenseEndDate, setEndDate] = useState(dayjs(expenseEndDateVar));

  return (
    <div>
      <h2>Viewing the expenses</h2>
      <div>
      <h2>Please fill below fields to view expenses</h2>
      <div>
        <InputLabel id="demo-simple-select-label">
          Expense Category
        </InputLabel>
        <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="ExpenseCategory"
              // onChange={handleItemCategory}
              onChange={(e) => setExpenseCategory(e.target.value)}
              value={expenseCategory}
              sx={{ width: "280px", marginBottom: "8px" }}
            >
              <MenuItem value={"Machine Parts"}>Machine Parts</MenuItem>
              <MenuItem value={"Office"}>Office</MenuItem>
              <MenuItem value={"Stationary"}>Stationary</MenuItem>
              <MenuItem value={"Kitchen"}>Kitchen</MenuItem>
              <MenuItem value={"Water"}>Water</MenuItem>
              <MenuItem value={"Fuel"}>Fuel</MenuItem>
              <MenuItem value={"others"}>others</MenuItem>
        </Select>
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
                      value={expenseStartDate}
                      onChange={(newValue)=>setStartDate(newValue)}/>
                  </DemoItem>
                  <DemoItem label="End Date of presence/absence">
                    <DesktopDatePicker value={expenseEndDate} onChange={(newValue)=>setEndDate(newValue)}/>
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
              // onClick={fetchEmployeePresence}
            >
              View Attendance
            </Button>
      </div>
      </div>
    </div>
  )
}

export default ExpenseReport
