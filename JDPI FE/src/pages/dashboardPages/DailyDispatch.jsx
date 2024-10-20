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

  const resetForm = () => {
    setDispatchVehicleNum("");
    setSlipNumber("");
    setDispatchDate(dayjs());
    setDispatchQuantity("");
    setdispatchItem("");
    setCustName("");
  };


  const submitDispatch = async () => {
    console.log(dispatchItem, dispatchDate, slipNumber, dispatchQuantity, custName, dispatchVehicleNum);

    const response = await fetch(
      `${import.meta.env.VITE_BASE_URL}/api/v1/sales/add-Dispatch`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          dispatchItem, 
          dispatchDate: dispatchDate.format("YYYY-MM-DD"),
          slipNumber, 
          dispatchQuantity, 
          custName, 
          dispatchVehicleNum
        }),
      }
    );
    const data = await response.json();
    console.log(data);
    if (response.status == 200) {
      snackbar("success", data.message);
      resetForm();
    } else {
      console.log(data.error);
      snackbar("error", data.error);
    }
  };

  return (
    <div className="dispatch-container baskervville-sc-regular">
      <h2>Daily Dispatch Log</h2>
      <div className="dispatch-subcontainer">
        <h2 style={{ fontSize: "25px" }}>Please fill in all the mandatory fields</h2>
        {/* DispatchItem, Quantity, Date, Slip Number, Vehicle Number */}
        <div className="dispatchForm-Row">
          <div>
            <InputLabel id="demo-simple-select-label" sx={{ paddingTop:"10px", paddingBottom:"7px"}}>Dispatch Item</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="ItemCategory"
              onChange={(e) => setdispatchItem(e.target.value)}
              value={dispatchItem}
              sx={{ width: "280px"}}
              required
            >
              <MenuItem value={"M Sand"}>M Sand</MenuItem>
              <MenuItem value={"GSB"}>GSB</MenuItem>
              <MenuItem value={"20mm"}>20mm</MenuItem>
              <MenuItem value={"Dust"}>Dust</MenuItem>
              <MenuItem value={"Murum"}>Murum</MenuItem>
            </Select>
          </div>
          <div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker", "DesktopDatePicker"]}>
              <DemoItem>
                <InputLabel id="demo-simple-select-label">
                  Date of dispatch
                </InputLabel>
                <DesktopDatePicker
                  value={dispatchDate}
                  required
                  onChange={(newValue) => setDispatchDate(newValue)}
                />
              </DemoItem>
            </DemoContainer>
            </LocalizationProvider>
          </div>
          
        </div>
        <div className="dispatchForm-Row">
          <TextField
            id="standard-basic"
            label="Slip Number"
            variant="standard"
            type="Number"
            sx={{ width: "280px" }}
            value={slipNumber}
            required
            onChange={(e) => setSlipNumber(e.target.value)}
          />
          <TextField
            id="standard-basic"
            label="Quantity (in Sq.Ft)"
            variant="standard"
            type="Number"
            sx={{ width: "280px" }}
            value={dispatchQuantity}
            required
            onChange={(e) => setDispatchQuantity(e.target.value)}
          />
          <TextField
            id="standard-basic"
            label="Customer Name"
            variant="standard"
            required
            type="String"
            sx={{ width: "280px" }}
            value={custName}
            onChange={(e) => setCustName(e.target.value)}
          />
        </div>
        <TextField
          id="standard-basic"
          label="Vehicle Number"
          variant="standard"
          type="String"
          sx={{ width: "280px" }}
          value={dispatchVehicleNum}
          required
          onChange={(e) => setDispatchVehicleNum(e.target.value)}
        />
        <Button
          variant="contained"
          sx={{
            padding: "5px",
            marginTop: "8px",
            width: "200px",
          }}
          onClick={submitDispatch}
        >
          {" "}
          Submit Entry
        </Button>
      </div>
    </div>
  );
};

export default DailyDispatch;
