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

const DailyDispatch = () => {
  let dispatchDateVar = Date();
  const [dispatchDate, setDispatchDate] = useState(dayjs(dispatchDateVar));
  const [dispatchVehicleNum, setDispatchVehicleNum] = useState();
  const [slipNumber, setSlipNumber] = useState();
  const [dispatchQuantity, setDispatchQuantity] = useState();
  const [dispatchItem, setdispatchItem] = useState();
  const [custName, setCustName] = useState();

  return (
    <div className="dispatch-container baskervville-sc-regular">
      <h2>Daily Dispatch Log</h2>
      <div className="dispatch-subcontainer">
        <h2 style={{fontSize:"25px"}}>Please fill in all the mandatory</h2>
        {/* DispatchItem, Quantity, Date, Slip Number, Vehicle Number */}
        <div className="dispatchForm-Row1">
          <InputLabel id="demo-simple-select-label">Dispatch Item</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="ItemCategory"
            onChange={(e) => setdispatchItem(e.target.value)}
            value={dispatchItem}
            sx={{ width: "280px", marginBottom: "8px" }}
          >
            <MenuItem value={"Machine Parts"}>M Sand</MenuItem>
            <MenuItem value={"Office"}>GSB</MenuItem>
            <MenuItem value={"Stationary"}>20mm</MenuItem>
            <MenuItem value={"Kitchen"}>Dust</MenuItem>
            <MenuItem value={"Water"}>Murum</MenuItem>
          </Select>
          <TextField
            id="standard-basic"
            label="Customer Name"
            variant="standard"
            type="String"
            sx={{ width: "280px", marginBottom: "15px" }}
            value={custName}
            onChange={(e) => setCustName(e.target.value)}
          />
          <TextField
            id="standard-basic"
            label="Quantity (in Tons)"
            variant="standard"
            type="Number"
            sx={{ width: "280px", marginBottom: "15px" }}
            value={dispatchQuantity}
            onChange={(e) => setDispatchQuantity(e.target.value)}
          />
        </div>
        <div className="dispatchForm-Row2">
          <TextField
            id="standard-basic"
            label="Slip Number"
            variant="standard"
            type="Number"
            sx={{ width: "280px", marginBottom: "15px" }}
            value={slipNumber}
            onChange={(e) => setSlipNumber(e.target.value)}
          />
          <TextField
            id="standard-basic"
            label="Vehicle Number"
            variant="standard"
            type="Number"
            sx={{ width: "280px", marginBottom: "15px" }}
            value={dispatchVehicleNum}
            onChange={(e) => setDispatchVehicleNum(e.target.value)}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker", "DesktopDatePicker"]}>
              <div>
                <DemoItem label="Date of dispatch">
                  <DesktopDatePicker
                    value={dispatchDate}
                    onChange={(newValue) => setDispatchDate(newValue)}
                  />
                </DemoItem>
              </div>
            </DemoContainer>
          </LocalizationProvider>
        </div>
        <Button
          variant="contained"
          sx={{
            padding: "5px",
            marginTop: "8px",
            width: "200px",
          }}
          // onClick={submitDispatch}
        >
          {" "}
          Submit Entry
        </Button>
      </div>
    </div>
  );
};

export default DailyDispatch;
